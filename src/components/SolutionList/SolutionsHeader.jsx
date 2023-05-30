'use client';
import React, { useEffect } from 'react';
import Popover from '@mui/material/Popover';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

function SolutionsHeader({ handleSort, handleFilter, challenges }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [popoverType, setPopoverType] = React.useState(false);
    const [sort, setSort] = React.useState('date desc');
    const [filteredChallenges, setFilteredChallenges] = React.useState(
        challenges.map((challenge) => challenge.id)
    );

    // Handle Sort
    useEffect(() => {
        handleSort(sort);
    }, [sort]);

    // Handle Filter
    useEffect(() => {
        handleFilter(filteredChallenges);
    }, [filteredChallenges]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        if (event.currentTarget.id === 'sort-by') {
            setPopoverType(false);
        } else if (event.currentTarget.id === 'filter-by') {
            setPopoverType(true);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'popover' : undefined;

    // Handle Category Checkbox Click
    const handleChallengeCheckboxClick = (challenge) => {
        // Check if the challange is already in the filteredChallenges array
        const index = filteredChallenges.indexOf(challenge);

        if (index === -1) {
            // If the challange is not in the array, add it
            setFilteredChallenges([...filteredChallenges, challenge]);
        } else {
            // If the challange is in the array, remove it
            const newFilteredChallenges = [...filteredChallenges];
            newFilteredChallenges.splice(index, 1);
            setFilteredChallenges(newFilteredChallenges);
        }
    };

    return (
        <div className="flex w-full px-auto sm:px-10 justify-between items-center border-2 bg-gray-100 dark:bg-gray-300">
            <div className="text-primary font-bold text-lg md:text-2xl dark:text-secondary">
                SOLUTIONS
            </div>
            <div className="flex text-slate-800">
                <div
                    onClick={handleClick}
                    id="sort-by"
                    className="cursor-pointer border-2 w-32 h-12 flex justify-center items-center"
                >
                    SORT BY
                    <ChevronUpIcon
                        className={`h-6 w-6 fill-primary dark:fill-secondary transition-transform duration-500 ease-in-out ${
                            open && !popoverType && 'rotate-180'
                        } `}
                    />
                </div>{' '}
                <div
                    id="filter-by"
                    onClick={handleClick}
                    className="cursor-pointer border-2 border-l-0 w-32 h-12 flex justify-center items-center"
                >
                    FILTER BY
                    <ChevronUpIcon
                        className={`h-6 w-6 fill-primary dark:fill-secondary transition-transform duration-500 ease-in-out ${
                            open && popoverType && 'rotate-180'
                        } `}
                    />
                </div>
                {!popoverType ? (
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                    >
                        <div className="w-64 text-sm ">
                            <p
                                className={`hover:scale-105 pl-3 py-3 cursor-pointer ${
                                    sort === 'date desc' &&
                                    'text-primary font-bold text-lg border-l-4 border-primary'
                                }`}
                                onClick={() => setSort('date desc')}
                            >
                                Most recent
                            </p>
                            <p
                                className={`hover:scale-105 pl-3 py-3 cursor-pointer ${
                                    sort === 'date asc' &&
                                    'text-primary font-bold text-lg border-l-4 border-primary'
                                }`}
                                onClick={() => setSort('date asc')}
                            >
                                Oldest first
                            </p>
                            <p
                                className={`hover:scale-105 pl-3 py-3 cursor-pointer ${
                                    sort === 'challenge asc' &&
                                    'text-primary font-bold text-lg border-l-4 border-primary'
                                }`}
                                onClick={() => setSort('challenge asc')}
                            >
                                Challenge Name Asc
                            </p>
                            <p
                                className={`hover:scale-105 pl-3 py-3 cursor-pointer ${
                                    sort === 'challenge desc' &&
                                    'text-primary font-bold text-lg border-l-4 border-primary'
                                }`}
                                onClick={() => setSort('challenge desc')}
                            >
                                Challenge Name Desc
                            </p>
                        </div>
                    </Popover>
                ) : (
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                    >
                        <div className="w-64 text-sm dark:bg-slate-600 dark:text-gray-200">
                            <div className="flex flex-col gap-3 border-b-4 py-5">
                                <p className="font-bold text-xl border-b-2 text-slate-300 px-5">
                                    Challenges
                                </p>

                                {challenges.map((challenge) => (
                                    <div
                                        key={challenge.id}
                                        className="flex items-center px-5 w-full"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filteredChallenges.includes(challenge.id)}
                                            onChange={() =>
                                                handleChallengeCheckboxClick(challenge.id)
                                            }
                                            id={challenge.id}
                                            className="h-6 w-6 accent-primary dark:accent-secondary cursor-pointer appearance-none border-4 border-primary dark:border-secondary focus:outline-none checked:bg-primary dark:checked:bg-secondary"
                                        />
                                        <label
                                            htmlFor={challenge.id}
                                            className="text-lg px-3 cursor-pointer line-clamp-1 break-words w-full"
                                        >
                                            {challenge.title}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Popover>
                )}
            </div>
        </div>
    );
}

export default SolutionsHeader;
