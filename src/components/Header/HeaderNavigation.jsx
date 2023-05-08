'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

function HeaderNavigation() {
    const router = useRouter();
    return (
        <div className="flex items-center space-x-6">
            <p
                onClick={() => router.push('/design')}
                className="cursor-pointer hover:no-underline link-underline link-underline-black pb-2"
            >
                Submit Design
            </p>
            <p
                onClick={() => router.push('/challenges')}
                className="cursor-pointer hover:no-underline link-underline link-underline-black pb-2"
            >
                Challenges
            </p>
            <p
                onClick={() => router.push('/Leaderboard')}
                className="cursor-pointer hover:no-underline link-underline link-underline-black pb-2"
            >
                Leaderboard
            </p>
        </div>
    );
}

export default HeaderNavigation;
