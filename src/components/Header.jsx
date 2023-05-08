'use client';

import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useState, useEffect } from 'react';
import HeaderNavigation from './Header/HeaderNavigation';
import Logo from './Header/Logo';

function Header() {
    const [isDarkMode, setDarkMode] = useState(null);

    const toggleDarkMode = (checked) => {
        setDarkMode(checked);
    };

    useEffect(() => {
        if (isDarkMode === null) {
            const localTheme = localStorage.getItem('color-theme');
            if (localTheme) {
                setDarkMode(localTheme === 'dark');
            } else {
                setDarkMode(false);
            }
        }
        localStorage.setItem('color-theme', isDarkMode ? 'dark' : 'light');
        console.log('in');
        console.log(localStorage.getItem('color-theme'));
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    let session = false;

    if (isDarkMode === null) {
        // render null or some placeholder while the initial localStorage value is being retrieved
        return null;
    }

    // add the "dark" class to the `html` element based on the `isDarkMode` state
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    }

    return (
        <div className="flex flex-col w-full items-center p-2 shadow-xl border-b-2 border-b-gray-300 dark:bg-slate-800 bg-white dark:text-white transition duration-500 ease-in-out">
            <div className="flex w-full justify-between items-center gap-10">
                {/* Logo */}
                <Logo></Logo>
                {/* Navigation */}
                <div className="hidden lg:block">
                    <HeaderNavigation></HeaderNavigation>
                </div>
                {/* User & Notification*/}
                <div className="flex gap-4 items-center">
                    {/* <!-- Dark Mode Toggle --> */}
                    <DarkModeSwitch
                        style={{ marginBottom: '0' }}
                        checked={isDarkMode}
                        onChange={toggleDarkMode}
                        size={24}
                    />
                    {session ? (
                        <div>{/* TO BE IMPLEMENTED AFTER AUTH */}</div>
                    ) : (
                        <div>
                            {/* Login Button */}
                            <button
                                onClick={() => router.push('/login')}
                                className="bg-gradient-to-tr from-primary to-secondary bg-primary hover:bg-gradient-to-bl text-white font-bold py-2 px-4 rounded"
                            >
                                Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {/* Navigation */}
            <div className="lg:hidden">
                <HeaderNavigation></HeaderNavigation>
            </div>
        </div>
    );
}

export default Header;
