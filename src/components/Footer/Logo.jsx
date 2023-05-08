'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';

function Logo() {
    const router = useRouter();
    return (
        <div
            className="flex items-center  space-x-2  cursor-pointer w-fit"
            onClick={() => router.push('/')}
        >
            <div className="relative h-8 w-8">
                <Image src="/logos/icon.png" fill className="object-fill" alt="Logo"></Image>
            </div>
            <h1 className="text-xl">Code Challenger</h1>
        </div>
    );
}

export default Logo;
