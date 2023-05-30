'use client';

import { auth } from '@/../lib/firebase';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import {
    GoogleAuthProvider,
    signInWithPopup,
    GithubAuthProvider,
    fetchSignInMethodsForEmail,
    linkWithCredential
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { redirect } from 'next/navigation';
import { SpinnerCircular } from 'spinners-react';

function SignIn() {
    const [user, loading, error] = useAuthState(auth);

    // Sign in with google
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        try {
            const results = await signInWithPopup(auth, provider);
        } catch (error) {
            console.log(error);
            alert('Error signing in with Google');
        }
    };

    // Sign in with github
    const signInWithGithub = async () => {
        const provider = new GithubAuthProvider();
        // Force user to select account on github
        provider.setCustomParameters({
            allow_signup: 'true'
        });

        const results = await signInWithPopup(auth, provider).catch((err) => {
            if (err.code === 'auth/account-exists-with-different-credential') {
                // The pending Facebook credential.
                var pendingCred = GithubAuthProvider.credentialFromError(err);
                // The provider account's email address.
                var email = err.customData.email;
                alert(
                    'Github account email is already registered, select correct google account if you would like to link github account.'
                );

                fetchSignInMethodsForEmail(auth, email).then((methods) => {
                    if (methods[0] === 'google.com') {
                        const provider = new GoogleAuthProvider();
                        provider.setCustomParameters({
                            prompt: 'select_account'
                        });
                        signInWithPopup(auth, provider)
                            .then(function (result) {
                                if (result.user.email === email) {
                                    linkWithCredential(result.user, pendingCred).then(
                                        (usercred) => {
                                            // GitHub account successfully linked to the existing Firebase user.
                                            console.log(
                                                'Account linking successful. Github linked to Google'
                                            );
                                        }
                                    );
                                } else {
                                    alert(
                                        'Logged in with Google Account. Github account email is already registered, select correct google account if you would like to link github account.'
                                    );
                                }
                            })
                            .catch((err) => {
                                alert(
                                    'Github account email is already registered, select correct google account to link github account.'
                                );
                            });
                    }
                });
            } else {
                alert('Error signing in with Github');
            }
        });
    };

    if (user) {
        redirect('/');
    }

    if (loading)
        return (
            <div className="flex items-center justify-center my-auto h-96">
                <SpinnerCircular color="#26b4e3" />
            </div>
        );

    return (
        <div className="mx-auto w-96 my-6 flex flex-col gap-3 shadow-xl bg-primary bg-opacity-10 dark:bg-slate-900 p-8 rounded-md dark:text-white">
            <h1 className="text-4xl py-3">Sign In</h1>

            {/* Google Button */}
            <button
                className="w-full h-10 rounded-md border-2 border-none flex justify-between focus:outline-secondary overflow-hidden bg-white"
                onClick={signInWithGoogle}
            >
                <FcGoogle className="inline-block h-10 w-10 p-2 " />
                <div className="flex-1 bg-google-red h-full flex items-center justify-center text-white">
                    Sign In with Google
                </div>
            </button>

            {/* Facebook Button */}
            <button
                className="w-full h-10 rounded-md border-2 border-none flex justify-between focus:outline-secondary overflow-hidden bg-white"
                onClick={signInWithGithub}
            >
                <AiFillGithub className="inline-block h-10 w-10 p-2 fill-github-gray" />
                <div className="flex-1 bg-github-gray h-full flex items-center justify-center text-white">
                    Sign In with Github
                </div>
            </button>
        </div>
    );
}

export default SignIn;
