'use client';
import SolutionCard from './SolutionList/SolutionCard';
import SolutionsHeader from './SolutionList/SolutionsHeader';
import { useState } from 'react';

function SolutionList({ solutions: solutionsProps, challengeList }) {
    const [solutions, setSolutions] = useState(solutionsProps);
    const [sort, setSort] = useState('date desc');
    // Handle Sort for Solutions
    const handleSort = (sort) => {
        // if (sort === 'date asc') {
        //     setSolutions([...solutions].sort((a, b) => new Date(a.date) - new Date(b.date)));
        //     setSort('date asc');
        // } else if (sort === 'date desc') {
        //     setSolutions([...solutions].sort((a, b) => new Date(b.date) - new Date(a.date)));
        //     setSort('date desc');
        // } else if (sort === 'challenge asc') {
        //     setSolutions(
        //         [...solutions].sort((a, b) =>
        //             challengeList[a.challenge].title.localeCompare(challengeList[b.challenge].title)
        //         )
        //     );
        //     setSort('challenge asc');
        // } else if (sort === 'challenge desc') {
        //     setSolutions(
        //         [...solutions].sort((a, b) =>
        //             challengeList[b.challenge].title.localeCompare(challengeList[a.challenge].title)
        //         )
        //     );
        //     setSort('challenge desc');
        // }
        sortSolutions(solutions, sort);
    };

    const sortSolutions = (solutions, sort) => {
        if (sort === 'date asc') {
            setSolutions([...solutions].sort((a, b) => new Date(a.date) - new Date(b.date)));
            setSort('date asc');
        } else if (sort === 'date desc') {
            setSolutions([...solutions].sort((a, b) => new Date(b.date) - new Date(a.date)));
            setSort('date desc');
        } else if (sort === 'challenge asc') {
            setSolutions(
                [...solutions].sort((a, b) =>
                    challengeList[a.challenge].title.localeCompare(challengeList[b.challenge].title)
                )
            );
            setSort('challenge asc');
        } else if (sort === 'challenge desc') {
            setSolutions(
                [...solutions].sort((a, b) =>
                    challengeList[b.challenge].title.localeCompare(challengeList[a.challenge].title)
                )
            );
            setSort('challenge desc');
        }
    };

    // Handle Filter for Solutions
    const handleFilter = (challenges) => {
        const filteredSolutions = [...solutionsProps].filter((solution) =>
            challenges.includes(solution.challenge)
        );
        sortSolutions(filteredSolutions, sort);
    };

    const challengeArray = Object.keys(challengeList).map((key) => {
        return {
            ...challengeList[key],
            id: key
        };
    });

    return (
        <>
            <SolutionsHeader
                handleSort={handleSort}
                handleFilter={handleFilter}
                challenges={challengeArray}
            ></SolutionsHeader>
            <div>
                <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 dark:bg-slate-700 p-10 gap-5">
                    {solutions.length > 0 ? (
                        solutions.map((solution) => (
                            <SolutionCard
                                solution={solution}
                                challenge={challengeList[solution.challenge]}
                                key={solution.id}
                            ></SolutionCard>
                        ))
                    ) : (
                        <p className="text-2xl font-bold col-span-3 dark:text-gray-200">
                            No challenges found, reset filters to see all challenges
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

export default SolutionList;
