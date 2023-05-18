'use client';

import React from 'react';
import { PortableText } from '@portabletext/react';
import { RichTextComponent } from '@/components/ChallengePage/RichTextComponent';
import Category from '../ChallengeList/Category';
import Difficulty from '../ChallengeList/Difficulty';
import ImageGallery from 'react-image-gallery';
import { urlFor } from '@/../lib/urlFor';

import { BookOpenIcon, InboxArrowDownIcon } from '@heroicons/react/24/solid';

function ChallengePost({ challenge }) {
    let images = [];

    [
        { image: challenge.desktopDesign, title: 'Desktop Design' },
        { image: challenge.mobileDesign, title: 'Mobile Design' },
        { image: challenge.tabletDesign, title: 'Tablet Design' }
    ].map(({ image, title }) => {
        image &&
            images.push({
                original: urlFor(image).height(500).width(800).url(),
                thumbnail: urlFor(image).width(100).height(100).url(),
                fullscreen: urlFor(image).height(1800).width(2600).url(),
                description: title,
                thumbnailLabel: title
            });
    });

    return (
        <div>
            <div className="flex items-center justify-between p-10 m-10 gap-20 flex-col-reverse lg:flex-row border-2 border-slate-200 rounded-3xl shadow-2xl dark:bg-slate-900">
                {/* Category, Difficulty, Title, Summary and Download Challenge Button*/}
                <div className="lg:w-1/2 flex flex-col gap-10 items-center">
                    <h1 className="font-bold text-3xl">{challenge.title}</h1>
                    <div className="flex justify-between w-full">
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
                    {/* Summary*/}
                    <p className="text-justify">{challenge.summary}</p>
                    {/* Download Challenge Button */}
                    <a
                        href={challenge.fileURL}
                        className="rounded-full bg-primary dark:bg-secondary p-4 text-white font-bold text-lg max-w-lg md:text-xl"
                    >
                        Download Challenge Starter
                    </a>
                </div>
                {/* Image Gallery */}
                <div className="w-fit max-w-[500px] h-fit">
                    <ImageGallery
                        items={images}
                        showPlayButton={false}
                        autoPlay={false}
                        thumbnailPosition="bottom"
                    />
                </div>
            </div>
            <div className="flex flex-col m-10 gap-10 lg:flex-row">
                <div className="lg:w-1/2 p-10 border-2 border-slate-200 rounded-3xl shadow-2xl dark:bg-slate-900">
                    <div className="flex items-center gap-5 mb-10">
                        <BookOpenIcon className="h-10 w-10 inline-block text-primary dark:text-secondary" />
                        <h1 className="text-4xl font-bold text-primary dark:text-secondary">
                            Challenge Description
                        </h1>
                    </div>
                    <PortableText
                        // Pass in block content straight from Sanity.io
                        value={challenge.description}
                        // Optionally override marks, decorators, blocks, etc. in a flat
                        // structure without doing any gymnastics
                        components={RichTextComponent}
                    />
                </div>
                <div className="lg:w-1/2 p-10 border-2 border-slate-200 rounded-3xl shadow-2xl dark:bg-slate-900 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-5 mb-10">
                            <InboxArrowDownIcon className="h-10 w-10 inline-block text-primary dark:text-secondary" />
                            <h1 className="text-4xl font-bold text-primary dark:text-secondary">
                                Assets Provided
                            </h1>
                        </div>
                        <ul className="list-disc ml-5 text-xl space-y-5">
                            {challenge.assets.map((asset) => (
                                <li key={asset._id}>{asset.name}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Author Avatar Name and Date Published */}
                    <div className="w-fit ml-auto mt-auto">
                        <div className="flex items-center gap-5 mt-10">
                            <img
                                src={
                                    urlFor(challenge.author.image).width(200).height(200).url() ||
                                    challenge.author.image_url
                                }
                                alt="Author Avatar"
                                className="rounded-full w-20 h-20"
                            />
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold text-primary dark:text-secondary">
                                    {challenge.author.name}
                                </h1>
                                <p className="text-xl text-slate-500 dark:text-slate-400">
                                    {new Date(challenge.publishedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChallengePost;
