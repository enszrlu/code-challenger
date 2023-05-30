'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Image from 'next/image';
import Popover from '@mui/material/Popover';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

function UserPanel() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    const id_default = 'user-avatar';
    const [anchorEl, setAnchorEl] = useState(null);

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
    const id = open ? id_default : undefined;

    if (loading) return <div></div>;

    if (error) {
        console.log(error);
        return <div></div>;
    }

    return user ? (
        <div>
            {/* User Panel */}
            <div className="flex h-10 w-fit overflow-hidden items-center" onClick={handleClick}>
                <Image
                    src={user.photoURL}
                    // fill
                    className="rounded-full"
                    alt="Logo"
                    width={40}
                    height={40}
                    style={{ objectFit: 'contain' }}
                ></Image>
                <ChevronUpIcon
                    className={`h-6 w-6 fill-primary dark:fill-secondary transition-transform duration-500 ease-in-out ${
                        open && 'rotate-180'
                    } `}
                />
            </div>

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
                <div className="p-5 space-y-5 dark:bg-slate-600 dark:text-gray-200">
                    <h1 className="font-bold">{user.displayName}</h1>
                    <h2 className="font-light text-sm">{user.email}</h2>
                    <button
                        onClick={() => auth.signOut()}
                        className="w-full bg-gradient-to-tr from-primary cursor-pointer to-secondary hover:bg-gradient-to-bl text-white font-bold py-2 px-4 rounded "
                    >
                        Logout
                    </button>
                </div>
            </Popover>
        </div>
    ) : (
        <div>
            {/* Login Button */}
            <a
                href="/login"
                className="bg-gradient-to-tr from-primary cursor-pointer to-secondary hover:bg-gradient-to-bl text-white font-bold py-2 px-4 rounded "
            >
                Login
            </a>
        </div>
    );
}

export default UserPanel;
