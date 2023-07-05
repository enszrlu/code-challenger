'use client';
import React from 'react';
import Challenge from './ChallengeList/Challenge';
import ChallengeHeader from './ChallengeList/ChallengeHeader';
import { useState } from 'react';

function ChallengeList({ challenges: challengesProps }) {
    const [challenges, setChallenges] = useState(challengesProps);
    const [sort, setSort] = useState('publishedAt desc');

    // Loop thru challengesProps and create an array of difficulties with level and name, no duplicates
    let difficulties = challengesProps.map((challenge) => challenge.difficulty).flat();
    difficulties = Object.values(
        difficulties.reduce((acc, cur) => {
            acc[cur._id] = cur;
            return acc;
        }, {})
    );
    // Sort difficulties array by level asc
    difficulties.sort((a, b) => a.level - b.level);

    // Loop thru challengesProps and create an array of categories, no duplicates
    let categories = challengesProps.map((challenge) => challenge.categories).flat();
    // Remove duplicates from categories array
    categories = Object.values(
        categories.reduce((acc, cur) => {
            acc[cur._id] = cur;
            return acc;
        }, {})
    );

    const sortChallenges = (sort, challenges) => {
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

        return newChallenges;
    };

    const handleSort = (sort) => {
        setSort(sort);

        setChallenges(sortChallenges(sort, challenges));
    };

    const handleFilter = (categories, difficulties) => {
        let newChallenges = [...challengesProps];
        let categoriesIds = categories.map((category) => category._id);

        // filter by category, check if all of the categories of each challenge is in categories array
        if (categories.length > 0) {
            newChallenges = [...newChallenges].filter((challenge) =>
                challenge.categories.every((category) => categoriesIds.includes(category._id))
            );
        }

        if (difficulties.length > 0) {
            const diffIds = difficulties.map((difficulty) => difficulty._id);
            newChallenges = [...newChallenges].filter((challenge) => {
                return diffIds.includes(challenge.difficulty._id);
            });
        }

        newChallenges = sortChallenges(sort, newChallenges);

        setChallenges(newChallenges);
    };

    console.log('challenges', challenges.length);
    console.log('challengesProps', challengesProps.length);

    return (
        <div>
            {/* Challenges Header */}
            <ChallengeHeader
                handleSort={handleSort}
                handleFilter={handleFilter}
                difficulties={difficulties}
                categories={categories}
            ></ChallengeHeader>
            <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 dark:bg-slate-700 p-10 gap-5">
                {challenges.length > 0 ? (
                    challenges.map((challenge) => (
                        <Challenge challenge={challenge} key={challenge._id}></Challenge>
                    ))
                ) : (
                    <p className="text-2xl font-bold col-span-3 dark:text-gray-200">
                        No challenges found, reset filters to see all challenges
                    </p>
                )}
            </div>
        </div>
    );
}

export default ChallengeList;
