'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';

function Logo() {
    const router = useRouter();
    return (
        <a className="flex items-center  space-x-2  cursor-pointer w-fit" href="/">
            <div className="relative h-12 w-12">
                <Image src="/logos/icon.png" fill className="object-fill" alt="Logo"></Image>
            </div>
            <TypeAnimation
                sequence={[
                    'Code', // Types 'Code'
                    500, // Waits 500ms
                    'Code Challenger' // types 'Challenger'
                ]}
                wrapper="h1"
                cursor={false}
                repeat={false}
                className="text-2xl "
            />
        </a>
    );
}

export default Logo;
