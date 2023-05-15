'use client';
import React, { useEffect } from 'react';
import Popover from '@mui/material/Popover';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

function ChallengeHeader({ handleSort, handleFilter, difficulties, categories }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [popoverType, setPopoverType] = React.useState(false);
    const [sort, setSort] = React.useState('publishedAt desc');
    const [filteredCategories, setFilteredCategories] = React.useState(categories);
    const [filteredDifficulties, setFilteredDifficulties] = React.useState(difficulties);

    // Handle Sort
    useEffect(() => {
        handleSort(sort);
    }, [sort]);

    // Handle Filter
    useEffect(() => {
        handleFilter(filteredCategories, filteredDifficulties);
    }, [filteredCategories, filteredDifficulties]);

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
    const handleCategoryCheckboxClick = (category) => {
        // Check if the category is already in the filteredCategories array
        const index = filteredCategories.indexOf(category);

        if (index === -1) {
            // If the category is not in the array, add it
            setFilteredCategories([...filteredCategories, category]);
        } else {
            // If the category is in the array, remove it
            const newFilteredCategories = [...filteredCategories];
            newFilteredCategories.splice(index, 1);
            setFilteredCategories(newFilteredCategories);
        }
    };

    // Handle Difficulty Checkbox Click
    const handleDifficultyCheckboxClick = (difficulty) => {
        // Check if the difficulty is already in the filteredDifficulties array
        const index = filteredDifficulties.indexOf(difficulty);

        if (index === -1) {
            // If the difficulty is not in the array, add it
            setFilteredDifficulties([...filteredDifficulties, difficulty]);
        } else {
            // If the difficulty is in the array, remove it
            const newFilteredDifficulties = [...filteredDifficulties];
            newFilteredDifficulties.splice(index, 1);
            setFilteredDifficulties(newFilteredDifficulties);
        }
    };

    return (
        <div className="flex w-full px-10 justify-between items-center border-2 bg-gray-100 dark:bg-gray-300">
            <div className="text-primary font-bold text-lg md:text-2xl dark:text-secondary">
                CHALLENGES
            </div>
            <div className="flex text-slate-800">
                <div
                    onClick={handleClick}
                    id="sort-by"
                    className="cursor-pointer border-2 w-32 h-12 flex justify-center items-center"
                >
                    SORT BY
                    <ChevronUpIcon
                        className={`h-6 w-6 fill-primary dark:fill-secondary ${
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
                        className={`h-6 w-6 fill-primary dark:fill-secondary ${
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
                                    sort === 'publishedAt desc' &&
                                    'text-primary font-bold text-lg border-l-4 border-primary'
                                }`}
                                onClick={() => setSort('publishedAt desc')}
                            >
                                Most recent
                            </p>
                            <p
                                className={`hover:scale-105 pl-3 py-3 cursor-pointer ${
                                    sort === 'difficulty.level asc' &&
                                    'text-primary font-bold text-lg border-l-4 border-primary'
                                }`}
                                onClick={() => setSort('difficulty.level asc')}
                            >
                                Difficulty (easier first)
                            </p>
                            <p
                                className={`hover:scale-105 pl-3 py-3 cursor-pointer ${
                                    sort === 'difficulty.level desc' &&
                                    'text-primary font-bold text-lg border-l-4 border-primary'
                                }`}
                                onClick={() => setSort('difficulty.level desc')}
                            >
                                Difficulty (harder first)
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
                                    Categories
                                </p>
                                {categories.map((category) => (
                                    <div key={category._id} className="flex items-center px-5">
                                        <input
                                            type="checkbox"
                                            checked={filteredCategories.includes(category)}
                                            onChange={() => handleCategoryCheckboxClick(category)}
                                            id={category._id}
                                            className="h-6 w-6 accent-primary dark:accent-secondary cursor-pointer appearance-none border-4 border-primary dark:border-secondary focus:outline-none checked:bg-primary dark:checked:bg-secondary "
                                        />
                                        <label
                                            htmlFor={category._id}
                                            className="text-lg px-3 cursor-pointer"
                                        >
                                            {category.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-3 border-b-4 py-5">
                                <p className="font-bold text-xl border-b-2 text-slate-300 px-5">
                                    Difficulties
                                </p>
                                {difficulties.map((difficulty) => (
                                    <div key={difficulty._id} className="flex items-center px-5">
                                        <input
                                            type="checkbox"
                                            checked={filteredDifficulties.includes(difficulty)}
                                            onChange={() =>
                                                handleDifficultyCheckboxClick(difficulty)
                                            }
                                            id={difficulty._id}
                                            className="h-6 w-6 accent-primary dark:accent-secondary cursor-pointer appearance-none border-4 border-primary dark:border-secondary focus:outline-none checked:bg-primary dark:checked:bg-secondary"
                                        />
                                        <label
                                            htmlFor={difficulty._id}
                                            className="text-lg px-3 cursor-pointer"
                                        >
                                            {`${difficulty.level} - ${difficulty.name}`}
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

export default ChallengeHeader;
