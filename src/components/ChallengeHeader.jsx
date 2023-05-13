'use client';
import React, { useEffect } from 'react';
import Popover from '@mui/material/Popover';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

function ChallengeHeader({ handleSort }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [popoverType, setPopoverType] = React.useState(false);
    const [sort, setSort] = React.useState('publishedAt desc');

    useEffect(() => {
        handleSort(sort);
    }, [sort]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        if (event.target.id === 'sort-by') {
            setPopoverType(false);
        } else if (event.target.id === 'filter-by') {
            setPopoverType(true);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'popover' : undefined;

    return (
        <div className="flex w-full px-10 justify-between items-center border-2 bg-gray-100 dark:bg-gray-300 transition duration-500 ease-in-out">
            <div className="text-primary font-bold text-lg md:text-2xl dark:text-secondary transition duration-500 ease-in-out">
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
                        className={`h-6 w-6 fill-primary dark:fill-secondary transition duration-500 ease-in-out ${
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
                        className={`h-6 w-6 fill-primary dark:fill-secondary transition duration-500 ease-in-out ${
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
                        <div className="w-64 text-sm cursor-pointer">
                            <p
                                className={`hover:scale-105 pl-3 py-3 ${
                                    sort === 'publishedAt desc' &&
                                    'text-primary font-bold text-lg border-l-4 border-primary'
                                }`}
                                onClick={() => setSort('publishedAt desc')}
                            >
                                Most recent
                            </p>
                            <p
                                className={`hover:scale-105 pl-3 py-3 ${
                                    sort === 'difficulty.level asc' &&
                                    'text-primary font-bold text-lg border-l-4 border-primary'
                                }`}
                                onClick={() => setSort('difficulty.level asc')}
                            >
                                Difficulty (easier first)
                            </p>
                            <p
                                className={`hover:scale-105 pl-3 py-3 ${
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
                        <div className="space-y-5 p-5 w-64 text-sm cursor-pointer">
                            <p className="hover:scale-105">HTML</p>
                            <p>CSS</p>
                            <p>JAVA</p>
                        </div>
                    </Popover>
                )}
            </div>
        </div>
    );
}

export default ChallengeHeader;
