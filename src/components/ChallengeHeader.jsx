import React from 'react';

function ChallengeHeader() {
    return (
        <div className="flex w-full px-10 py-5 justify-between border-2 bg-gray-100 dark:bg-gray-300 transition duration-500 ease-in-out">
            <div className="text-primary font-bold text-xl dark:text-secondary transition duration-500 ease-in-out">
                CHALLENGES
            </div>
            <div className="flex gap-10 text-slate-800">
                <div>SORT BY</div>
                <div>FILTER BY</div>
            </div>
        </div>
    );
}

export default ChallengeHeader;
