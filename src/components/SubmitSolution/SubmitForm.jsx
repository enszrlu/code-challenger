'use client';

import { redirect, useSearchParams } from 'next/navigation';
import { auth } from '@/../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SpinnerCircular } from 'spinners-react';
import { useState } from 'react';
import Image from 'next/image';
import SolutionPreview from './SolutionPreview';

function SubmitForm() {
    const [user, loading, error] = useAuthState(auth);
    const [solution, setSolution] = useState(null);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const searchParams = useSearchParams();
    const challenge = searchParams.get('challenge');

    // Handles the submit event on form submit.
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault();

        // Get data from the form.
        const data = {
            // Parse data from form.
            title: event.target.title.value,
            repo_url: event.target.repo.value,
            live_url: event.target.live.value,
            summary: event.target.readme.value,
            challenge: challenge,
            uid: user?.uid || 'test',
            user_name: user?.displayName || 'test'
        };

        // Check Repository URL to include github, gitlab or bitbucket
        if (
            !data.repo_url.includes('github') &&
            !data.repo_url.includes('gitlab') &&
            !data.repo_url.includes('bitbucket')
        ) {
            alert('Please include a valid Github, Gitlab or Bitbucket URL');
            return;
        }

        // Check live site URL include valid domain (github pages, netlify, vercel, heroku, cloudfare pages, gitlab pages, firebase hosting, surge, repl.it, render, fly.io, deno deploy, editor x)
        function isValidDomain(url) {
            const validDomains =
                /(github\.io|netlify\.app|vercel\.app|herokuapp\.com|pages\.cloudflare\.com|gitlab\.io|firebaseapp\.com|surge\.sh|repl\.it|onrender\.com|fly\.dev|deno\.app|editorx\.io)$/;

            return validDomains.test(new URL(url).hostname);
        }

        if (!isValidDomain(data.live_url)) {
            alert('Please include a valid live site URL');
            return;
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint =
            (process.env.VERCEL_URL || 'http://127.0.0.1:3000') + '/api/submit-solution';

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json'
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata
        };

        let result;

        try {
            setLoadingSubmit(true);
            // Send the form data to our forms API on Vercel and get a response.
            const response = await fetch(endpoint, options);

            // Get the response data from server as JSON.
            // If server returns the name submitted, that means the form works.
            result = await response.json();
            alert(`Solution Submitted`);
            setSolution(result);
            setLoadingSubmit(false);
        } catch (error) {
            // If server returns an error, that means the form failed.
            alert(`Error: ${error}`);
            setLoadingSubmit(false);
        }
    };

    if (loading || loadingSubmit)
        return (
            <div className="flex items-center justify-center my-auto h-96">
                <SpinnerCircular color="#26b4e3" />
            </div>
        );

    if (error) {
        redirect('/');
    }

    if (solution) {
        redirect(`/solution/${solution}`);
    }

    return (
        <>
            {/* Header */}
            <div className="flex w-full px-auto sm:px-10 justify-between items-center border-2 bg-gray-100 dark:bg-gray-300">
                <h1 className="text-primary font-bold text-lg md:text-2xl dark:text-secondary my-3">
                    Submit Solution
                </h1>
                {/* Challenge Title */}
            </div>

            {!solution ? (
                /* Form */
                <div className="sm:max-w-xl md:max-w-2xl lg:max-w-4xl p-5 mx-5 sm:mx-auto my-5 shadow-2xl rounded-2xl border-2 dark:bg-slate-900">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        {/* Solution Title with input */}
                        <label htmlFor="title" className="font-extrabold text-lg">
                            Solution title <span className="text-red-600">*</span>
                        </label>
                        <p className="text-sm text-gray-500 italic font-extralight">
                            Please include the name of the challenge and the technologies used.
                        </p>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            placeholder="e.g. Hulu Clone using React and Tailwind"
                            maxlength={70}
                            minLength={10}
                            className="border-2 border-gray-300 dark:border-slate-700 focus:outline-primary dark:focus:outline-secondary rounded-md p-2"
                        />

                        {/* Repository URL with input */}
                        <label htmlFor="repo" className="mt-5 font-extrabold text-lg">
                            Repository URL <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="url"
                            id="repo"
                            name="repo"
                            required
                            placeholder="Github, Gitlab or Bitbucket URL"
                            className="border-2 border-gray-300 dark:border-slate-700 focus:outline-primary dark:focus:outline-secondary rounded-md p-2"
                        />

                        {/* Live Site URL with input */}
                        <label htmlFor="live" className="mt-5 font-extrabold text-lg">
                            Live Site URL <span className="text-red-600">*</span>
                        </label>
                        <p className="text-sm text-gray-500 italic font-extralight">
                            Read more about{' '}
                            <a
                                href="https://medium.com/frontend-mentor/frontend-mentor-trusted-hosting-providers-bf000dfebe"
                                className="font-bold dark:text-white underline"
                                target="_blank"
                            >
                                recommended free hosting options.
                            </a>
                        </p>
                        <input
                            type="url"
                            id="live"
                            name="live"
                            required
                            placeholder="e.g. Github Pages URL"
                            className="border-2 border-gray-300 dark:border-slate-700 focus:outline-primary dark:focus:outline-secondary rounded-md p-2"
                        />

                        {/* README for your solution */}
                        <label htmlFor="readme" className="mt-5 font-extrabold text-lg">
                            README - Summary for your solution{' '}
                            <span className="text-red-600">*</span>
                        </label>
                        <p className="text-sm text-gray-500 italic font-extralight">
                            Please include a summary of your solution. Challenges, what you learned,
                            what you would do differently, etc.
                        </p>
                        <textarea
                            id="readme"
                            name="readme"
                            rows="4"
                            cols="50"
                            placeholder="e.g. I learned how to use React Context and Styled Components. I would like to add a dark mode toggle."
                            className="border-2 border-gray-300 dark:border-slate-700 focus:outline-primary dark:focus:outline-secondary rounded-md p-2"
                            maxLength={500}
                            minLength={20}
                            required
                        ></textarea>

                        <button
                            type="submit"
                            className="rounded-full bg-primary dark:bg-secondary p-4 text-white font-bold max-w-lg text-sm xl:text-lg text-center mx-auto w-64 my-5"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            ) : (
                /* Solution Preview */
                <SolutionPreview solution={solution} />
            )}
        </>
    );
}

export default SubmitForm;
