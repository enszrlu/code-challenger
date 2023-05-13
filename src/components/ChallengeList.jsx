'use client';
import React from 'react';
import Challenge from './Challenge';
import ChallengeHeader from './ChallengeHeader';
import { useState } from 'react';
import { groq } from 'next-sanity';
import { client } from '../../lib/sanity.client';

function ChallengeList({ challenges: challengesProps }) {
    const [challenges, setChallenges] = useState(challengesProps);

    const handleSort = (sort) => {
        let newChallenges;

        // sort by difficulty.level asc
        if (sort === 'difficulty.level asc') {
            newChallenges = [...challenges].sort((a, b) => a.difficulty.level - b.difficulty.level);
        }
        // sort by difficulty.level desc
        else if (sort === 'difficulty.level desc') {
            newChallenges = [...challenges].sort((a, b) => b.difficulty.level - a.difficulty.level);
        }
        // sort by 'publishedAt desc' by default
        else {
            newChallenges = [...challenges].sort(
                (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
            );
        }

        setChallenges(newChallenges);
    };

    return (
        <div>
            {/* Challenges Header */}
            <ChallengeHeader handleSort={handleSort}></ChallengeHeader>
            <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 dark:bg-slate-700 transition duration-500 ease-in-out p-10 gap-5">
                {challenges.map((challenge) => (
                    <Challenge challenge={challenge} key={challenge._id}></Challenge>
                ))}
            </div>
        </div>
    );
}

export default ChallengeList;
