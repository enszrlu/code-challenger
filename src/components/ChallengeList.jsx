import React from 'react';
import Challenge from './Challenge';

function ChallengeList({ challenges }) {
    // console.log(challenges);
    return (
        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 dark:bg-slate-700 transition duration-500 ease-in-out p-10 gap-5">
            {challenges.map((challenge) => (
                <Challenge challenge={challenge} key={challenge._id}></Challenge>
            ))}
        </div>
    );
}

export default ChallengeList;
