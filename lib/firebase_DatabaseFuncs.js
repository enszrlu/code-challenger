import {
    ref,
    set,
    push,
    get,
    increment,
    update,
    query,
    orderByChild,
    limitToLast,
    onValue
} from 'firebase/database';

const admin = require('firebase-admin');

const serviceAccount = require('./secrets/serviceAccountKey.json');

if (admin.apps.length === 0) {
    const app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    });
}

const database = admin.database();

// Write Solution to the Realtime Database
export function writeNewSolutionData({
    title,
    repo_url,
    live_url,
    summary,
    challenge,
    uid,
    desktop_screenshot,
    mobile_screenshot,
    tablet_screenshot,
    user_name
}) {
    return new Promise((resolve, reject) => {
        const solution_ref = push(ref(database, 'solutions'));

        const solution_data = {
            title,
            challenge,
            repo_url,
            live_url,
            summary,
            user: uid,
            date: new Date().toISOString(),
            desktop_screenshot,
            mobile_screenshot,
            tablet_screenshot,
            user_name: user_name
        };

        // Reference for challenges/solutions array with push
        const challenge_solutions_ref = ref(
            database,
            'challenges/' + challenge + '/solutions/' + solution_ref.key
        );
        const challenge_solutions_data = {
            active: true
        };

        // Reference for user/solutions and user/compChallenges arrays with push
        // const solutions_ref = ref(database, 'users/' + uid + '/solutions');
        // const solutions__data = challenge_solutions_data;
        const compChallenges_ref = ref(
            database,
            'users/' + uid + '/compChallenges/' + challenge + '/' + solution_ref.key
        );
        const compChallenges_data = { active: true };

        // Create reference to users/uid/points and increase it by 10
        const likes_ref = ref(database, 'users/' + uid + '/points');

        set(solution_ref, solution_data)
            .then(() => {
                set(challenge_solutions_ref, challenge_solutions_data)
                    .then(() => {
                        set(compChallenges_ref, compChallenges_data)
                            .then(() => {
                                // increment(likes_ref, 10)
                                const updates = {};
                                updates[`users/${uid}/points`] = increment(10);

                                try {
                                    update(ref(database), updates);
                                    // resolve(solution_data);
                                    resolve(solution_ref.key);
                                } catch (error) {
                                    reject(error);
                                }
                            })
                            .catch((error) => {
                                reject({
                                    ...error,
                                    customMessage:
                                        'Error adding completed challenges to user database'
                                });
                            });
                    })
                    .catch((error) => {
                        reject({
                            ...error,
                            customMessage: 'Error writing challenge solution to challenge database'
                        });
                    });
            })
            .catch((error) => {
                reject({ ...error, customMessage: 'Error writing solution to user database' });
            });
    });
}

export const fetchSolution = async (solution_id) => {
    return new Promise(async (resolve, reject) => {
        const solution_ref = ref(database, 'solutions/' + solution_id);
        const snapshot = await get(solution_ref);
        if (snapshot.exists()) {
            resolve(snapshot.val());
        } else {
            reject('No data available');
        }
    });
};

export const fetchSolutions = async (limit = 0) => {
    return new Promise(async (resolve, reject) => {
        const solutions_ref = ref(database, 'solutions');
        // const snapshot = await get(solutions_ref);
        // if (snapshot.exists()) {
        //     resolve(snapshot.val());
        // } else {
        //     reject('No data available');
        // }

        if (limit === 0) {
            const q = query(solutions_ref, orderByChild('date'));
            const snapshot2 = await get(q);

            if (snapshot2.exists()) {
                resolve(snapshot2.val());
            } else {
                reject('No data available');
            }
        } else {
            const q = query(solutions_ref, orderByChild('date'), limitToLast(limit));
            const snapshot2 = await get(q);

            if (snapshot2.exists()) {
                resolve(snapshot2.val());
            } else {
                reject('No data available');
            }
        }
    });
};
