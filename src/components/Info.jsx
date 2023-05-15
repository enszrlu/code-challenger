import React from 'react';
import { ArrowUpTrayIcon, BoltIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

function Info() {
    return (
        <div className="gap-10 flex flex-col items-center p-10 text-center dark:bg-slate-700 dark:text-gray-200 select-none border-b-2 border-gray-400 shadow-sm dark:border-slate-950">
            <div className="relative h-64 w-64 animate-bounce-less">
                <Image src="/icons/rocket.png" fill className="object-fill" alt="Logo"></Image>
            </div>
            <h1 className="text-3xl font-extrabold">At your fingertips: a dedicated challenger.</h1>
            <div
                id="cards"
                className="grid grid-cols-1 max-w-4xl gap-5 mx-auto sm:grid-cols-2 lg:grid-cols-3"
            >
                <div className="flex flex-col items-center text-center border-opacity-25 gap-3">
                    <ArrowUpTrayIcon className="h-24 w-24 fill-primary dark:fill-secondary" />
                    <h1 className="font-bold text-xl">Submit Your Design</h1>
                    <p>
                        If you are a designer; you can submit your own design with screenshots and
                        Figma url.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center border-opacity-25 gap-3">
                    <BoltIcon className="h-24 w-24 fill-primary dark:fill-secondary" />
                    <h1 className="font-bold text-xl">Take a Challenge</h1>
                    <p>
                        If you are a developer; look through collection of web designs and pick one
                        challenge to boost your skills.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center border-opacity-25 gap-3 sm:col-span-2 lg:col-span-1  sm:max-w-[50%] lg:max-w-full mx-auto">
                    <UserGroupIcon className="h-24 w-24 fill-primary dark:fill-secondary" />
                    <h1 className="font-bold text-xl">Community</h1>
                    <p>Enjoy getting feedback from our community and give others feedback.</p>
                </div>
            </div>
        </div>
    );
}

export default Info;
