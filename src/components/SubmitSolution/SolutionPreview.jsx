'use client';
import React from 'react';
import ImageGallery from 'react-image-gallery';
import Link from 'next/link';

function SolutionPreview({ solution, challenge }) {
    let images = [];

    [
        {
            image: `data:image/png;base64,${solution.desktop_screenshot.toString('base64')}`,
            title: 'Desktop Design'
        },
        {
            image: `data:image/png;base64,${solution.mobile_screenshot.toString('base64')}`,
            title: 'Mobile Design'
        },
        {
            image: `data:image/png;base64,${solution.tablet_screenshot.toString('base64')}`,
            title: 'Tablet Design'
        }
    ].map(({ image, title }) => {
        image &&
            images.push({
                original: image,
                thumbnail: image,
                fullscreen: image,
                description: title,
                thumbnailLabel: title
            });
    });

    return (
        <div>
            <div className="flex items-center p-10 m-10 gap-20 flex-col-reverse lg:flex-row lg:justify-between border-2 border-slate-200 rounded-3xl shadow-2xl dark:bg-slate-900">
                {/* Category, Difficulty, Title, Summary and Download Challenge Button*/}
                <div className="lg:w-1/2 flex flex-col gap-10 items-center">
                    {/* Preview */}
                    <Link
                        href={`/challenge/${challenge.slug.current}`}
                        target="_blank"
                        className="font-bold text-4xl text-center border-b-2 w-full line-clamp-2 break-words"
                    >
                        {challenge.title}
                    </Link>
                    {/* Title */}
                    <h1 className="font-bold text-3xl text-center">{solution.title}</h1>

                    <div className="flex gap-10">
                        {/* Repo URL */}
                        <a
                            href={solution.repo_url}
                            target="_blank"
                            className="rounded-full bg-primary dark:bg-secondary p-4 text-white font-bold max-w-lg text-sm xl:text-lg text-center"
                        >
                            Repo URL
                        </a>

                        {/* Live URL */}
                        <a
                            href={solution.live_url}
                            target="_blank"
                            className="rounded-full bg-primary dark:bg-secondary p-4 text-white font-bold max-w-lg text-sm xl:text-lg text-center"
                        >
                            Live URL
                        </a>
                    </div>

                    {/* Summary */}
                    <p className="text-justify">{solution.summary}</p>

                    <div className="flex w-full justify-between">
                        {/* User Name */}
                        <p className="font-bold">{solution.user_name}</p>
                        {/* Date Submitted */}
                        <p>{new Date(solution.date).toLocaleString()}</p>
                    </div>
                </div>
                {/* Image Gallery */}
                <div className="w-fit max-w-[500px] h-fit">
                    <ImageGallery
                        items={images}
                        showPlayButton={false}
                        autoPlay={false}
                        showThumbnails={false}
                    />
                </div>
            </div>
        </div>
    );
}

export default SolutionPreview;
