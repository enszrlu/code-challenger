'use client';

import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useState, useEffect } from 'react';
import HeaderNavigation from './Header/HeaderNavigation';
import Logo from './Header/Logo';
import UserPanel from './Header/UserPanel';

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
        } else {
            localStorage.setItem('color-theme', isDarkMode ? 'dark' : 'light');
            if (isDarkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, [isDarkMode]);

    return (
        <>
            <div className="fixed flex flex-col w-full items-center p-2 shadow-xl border-b-2 border-b-gray-300 dark:border-b-slate-950 dark:bg-slate-900 bg-white dark:text-white transition duration-500 ease-in-out select-none z-50">
                <div className="flex w-full justify-between items-center gap-10">
                    {/* Logo */}
                    <div className="flex-1">
                        <Logo></Logo>
                    </div>
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
                        <UserPanel></UserPanel>
                    </div>
                </div>
                {/* Navigation */}
                <div className="lg:hidden">
                    <HeaderNavigation></HeaderNavigation>
                </div>
            </div>
            <div className="w-full h-24 lg:h-16 "></div>
        </>
    );
}

export default Header;
