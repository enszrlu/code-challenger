'use client';

import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';

function ShowCase() {
    return (
        <div className="bg-white dark:bg-slate-800 dark:text-gray-200 transition duration-500 ease-in-out select-none flex border-b-2 border-gray-400 shadow-sm dark:border-slate-950">
            <div className="flex flex-col items-center text-center py-10 px-6 gap-10 flex-1 ">
                <TypeAnimation
                    sequence={['Design', 1000, 'Develop', 1000, 'Challenge Yourself', 4000]}
                    wrapper="h1"
                    cursor={true}
                    repeat={Infinity}
                    className="text-4xl md:text-6xl"
                />
                <div className="relative">
                    <div className="absolute h-24 w-24 place-self-end left-0 bottom-0">
                        <Image
                            src="/icons/app-development.png"
                            fill
                            className="object-fill opacity-10"
                            alt="Web Development"
                        ></Image>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-xl border-b-2 border-gray-400 w-fit max-w-screen-md py-3 px-5">
                            Master your design, share with others and watch it grow.
                        </p>
                        <p className="text-xl max-w-screen-md p-3">
                            Access to hundreds of challenges, practice your skills on your favorite
                            tech and get feedback from our community.
                        </p>
                    </div>
                    <div className="absolute h-24 w-24 right-0 top-0">
                        <Image
                            src="/icons/web-design.png"
                            fill
                            className="object-fill opacity-10"
                            alt="Web Design"
                        ></Image>
                    </div>
                </div>
            </div>
            <div className="relative h-96 w-96 hidden lg:block">
                <Image
                    src="/stock/stock_collab.jpg"
                    fill
                    className="object-cover opacity-100"
                    alt="Web Design"
                ></Image>
            </div>
        </div>
    );
}

export default ShowCase;
