'use client';

import React from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { useEffect } from 'react';

function ThemeProviderComponent({ children }) {
    const { theme, setTheme } = useTheme();

    // read localStorage to set theme
    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        if (localTheme) {
            setTheme(localTheme);
        }
    }, []);

    return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}

export default ThemeProviderComponent;
