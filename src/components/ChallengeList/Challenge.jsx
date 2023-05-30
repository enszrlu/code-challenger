import Image from 'next/image';
import React from 'react';
import { urlFor } from '../../../lib/urlFor';
import Category from './Category';
import Difficulty from './Difficulty';
import ClientSideRoute from '../ClientSideRoute';

function Challenge({ challenge }) {
    return (
        <ClientSideRoute route={`/challenge/${challenge.slug.current}`}>
            <div className="flex flex-col group cursor-pointer rounded-2xl border-2 overflow-hidden shadow-lg dark:bg-slate-900 dark:text-gray-200 h-full dark:border-slate-900">
                <div className="relative w-full h-64 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">
                    <Image
                        className="object-cover object-top lg:object-top"
                        src={urlFor(challenge.desktopDesign).url()}
                        alt={challenge.author.name}
                        fill
                    ></Image>
                </div>
                <div className="flex flex-col p-5 gap-5">
                    <h1
                        className="w-full text-center text-2xl font-bold h-24 line-clamp-3"
                        title={challenge.title}
                    >
                        {challenge.title}
                    </h1>
                    <div className="flex justify-between items-center">
                        {/* Categories */}
                        <div className="flex gap-3">
                            {challenge.categories.map((category) => (
                                <Category category={category.name} key={category._id}></Category>
                            ))}
                        </div>
                        {/* Difficulty */}
                        <Difficulty
                            level={challenge.difficulty.level}
                            name={challenge.difficulty.name}
                        ></Difficulty>
                    </div>
                    {/* Summary */}
                    <p className="text-sm font-light line-clamp-5">{challenge.summary}</p>
                </div>
            </div>
        </ClientSideRoute>
    );
}

export default Challenge;
