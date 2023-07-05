'use client';

import { redirect } from 'next/navigation';
import { auth } from '@/../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SpinnerCircular } from 'spinners-react';
import { use, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import slugify from 'react-slugify';
import dynamic from 'next/dynamic';
import { groq } from 'next-sanity';
import { client } from '@/../lib/sanity.client';
import { set } from 'sanity';
import { red } from '@mui/material/colors';

const BlockContentInput = dynamic(() => import('./BlockContent'), {
    ssr: false
});

function SubmitDesignForm({ difficultiesData, categoriesData, assetsData }) {
    const [user, loading, error] = useAuthState(auth);
    const [description, setDescription] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState([]);
    const [selectedAssets, setSelectedAssets] = useState([]);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const { theme, setTheme } = useTheme();
    const [dropdownBG, setDropdownBG] = useState({
        hover: '#26b4e3',
        bg: 'white',
        focus: '#26b4e3'
    });
    const [author, setAuthor] = useState(null);
    // Animated Select
    const animatedComponents = makeAnimated();

    // Set Dropdown Theme
    useEffect(() => {
        if (theme === 'dark') {
            setDropdownBG({
                hover: '#ab2bda',
                bg: '#1F2937',
                focus: '#ab2bda'
            });
        } else {
            setDropdownBG({
                hover: '#26b4e3',
                bg: 'white',
                focus: '#26b4e3'
            });
        }
    }, [theme]);

    const fetchAuthor = async () => {
        const resp = await client.fetch(groq`*[_type == "author" && _id == "${user.uid}"]`);
        setAuthor(resp[0]);
    };
    // Fetch Author If Available
    useEffect(() => {
        if (user) {
            fetchAuthor();
        }
    }, [user]);

    // Get Categories to right format for Select
    const categories = categoriesData.map((category) => ({
        label: category.name,
        value: category._id
    }));
    // Get Difficulties sorted and to right format for Select
    const difficulty = difficultiesData
        .sort((a, b) => a.level - b.level)
        .map((difficulty) => ({
            label: `${difficulty.level} - ${difficulty.name}`,
            value: difficulty._id
        }));

    // Get Assets to right format for Select
    const assets = assetsData.map((asset) => {
        return {
            label: asset.name,
            value: asset._id
        };
    });

    // Handles file change on file input. Limits file size
    function handleFileChange(event, limit = 2) {
        const file = event.target.files[0]; // Access the selected file
        const maxSize = limit * 1024 * 1024; // Maximum file size in bytes (e.g., 2 MB)

        if (file && file.size > maxSize) {
            // File size exceeds the limit
            alert(`File size exceeds the maximum limit of ${limit}MB.`);
            // Reset the file input if needed
            event.target.value = null;
        } else {
            // File size is within the limit, you can continue with further processing
            // For example, you can upload the file or perform any other operations
        }
    }

    // Handles the submit event on form submit.
    // TODO: VALIDATE DATA
    // TODO: GET AUTHOR INFO - REGISTER AUTHOR
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault();

        // TODO: GET AUTHOR INFO - REGISTER AUTHOR
        // const author = user?.uid || 'test';

        // TODO: Check if slug exists
        const slug = slugify(event.target.title.value);

        // Get data from the form.
        const data = {
            // Parse data from form.
            title: event.target.title.value,
            desktopDesign: event.target.desktopDesign.files[0],
            tabletDesign: event.target.tabletDesign.files[0],
            mobileDesign: event.target.mobileDesign.files[0],
            categories: selectedCategories,
            difficulty: selectedDifficulty,
            assetFiles: event.target.assetFile.files[0],
            figma_url: event.target.figma.value,
            assets: selectedAssets,
            summary: event.target.readme.value,
            description,
            author: author,
            user: user,
            slug,
            publishedAt: new Date().toISOString()
        };

        // TODO: FIND BETTER WAY TO DO THIS
        const readFileData = async (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = function (event) {
                    const fileData = event.target.result;
                    resolve(fileData);
                };

                reader.onerror = function (event) {
                    reject(event.error);
                };

                reader.readAsDataURL(file);
            });
        };

        const updateFileData = async () => {
            if (data.desktopDesign) {
                const fileData = await readFileData(data.desktopDesign);
                data.desktopDesign = fileData;
            }

            if (data.tabletDesign) {
                const fileData = await readFileData(data.tabletDesign);
                data.tabletDesign = fileData;
            }

            if (data.mobileDesign) {
                const fileData = await readFileData(data.mobileDesign);
                data.mobileDesign = fileData;
            }

            if (data.assetFiles) {
                const fileData = await readFileData(data.assetFiles);
                data.assetFiles = fileData;
            }
        };

        try {
            await updateFileData();
            // Use the updated data object as needed
        } catch (error) {
            console.error('Error reading file data:', error);
        }

        if (data.figma_url && data.figma_url.length > 0) {
            // Check Repository URL is valid figma
            var figma_pattern =
                /^(?:https:\/\/)?(?:www\.)?figma\.com\/(file|proto)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/;
            var matched_url = data.figma_url.match(figma_pattern);

            if (!matched_url || !data.figma_url === matched_url[0]) {
                alert('Please include a valid Figma URL');
                return;
            }
        }

        // Check if categories are selected
        if (selectedCategories.length === 0) {
            alert('Please select at least one category');
            return;
        }

        // Check if difficulty is selected
        if (selectedDifficulty.length === 0) {
            alert('Please select a difficulty');
            return;
        }

        // Check if assets are selected
        if (selectedAssets.length === 0) {
            alert('Please select at least one asset');
            return;
        }

        // console.log(data);

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = `${process.env.NEXT_PUBLIC_URL || ''}/api/submit-design`;

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
        // // DEBUG
        // console.log('categories', data.categories);
        // console.log('difficulty', data.difficulty);
        // console.log('assets', data.assets);
        // console.log('data', data);

        // return false;

        try {
            // setLoadingSubmit(true);

            // Send the form data to our forms API on Vercel and get a response.
            const response = await fetch(endpoint, options);

            // Get the response data from server as JSON.
            result = await response.json();
            alert(`Challenge Submitted`);
            redirect(`/solution/${result.slug}`);

            // setLoadingSubmit(false);
        } catch (error) {
            // If server returns an error, that means the form failed.
            alert(`Error: ${error}`);

            // setLoadingSubmit(false);
        }

        // console.log('result:', result);
    };

    if (loading || loadingSubmit)
        return (
            <div className="flex items-center justify-center my-auto h-96">
                <SpinnerCircular color="#26b4e3" />
            </div>
        );

    if (error || !user) {
        redirect('/login');
    }

    // if (solution) {
    //     redirect(`/solution/${solution}`);
    // }

    return (
        <div className="sm:max-w-xl md:max-w-2xl lg:max-w-4xl p-5 mx-5 sm:mx-auto my-5 shadow-2xl rounded-2xl border-2 dark:bg-slate-900">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2"
                encType="multipart/form-data"
            >
                {/* Solution Title with input */}
                <label htmlFor="title" className="font-extrabold text-lg">
                    Challenge Title <span className="text-red-600">*</span>
                </label>
                <p className="text-sm text-gray-500 italic font-extralight">
                    Please include the name of the challenge.
                </p>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    placeholder="e.g. Hulu Clone"
                    maxLength={40}
                    minLength={7}
                    className="border-2 border-gray-300 dark:border-slate-700 focus:outline-primary dark:focus:outline-secondary rounded-md p-2"
                />

                {/* Desktop Design Image Uploader*/}
                <label htmlFor="desktopDesign" className="mt-5 font-extrabold text-lg">
                    Desktop Design <span className="text-red-600">*</span>
                </label>
                <input
                    type="file"
                    id="desktopDesign"
                    name="desktopDesign"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    className="border-2 border-gray-300 dark:border-slate-700 focus:outline-primary dark:focus:outline-secondary rounded-md p-2"
                />

                {/* Mobile Design Image Uploader */}
                <label htmlFor="mobileDesign" className="mt-5 font-extrabold text-lg">
                    Mobile Design <span className="text-red-600">*</span>
                </label>
                <input
                    type="file"
                    id="mobileDesign"
                    name="mobileDesign"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    className="border-2 border-gray-300 dark:border-slate-700 focus:outline-primary dark:focus:outline-secondary rounded-md p-2"
                />

                {/* Tablet Design Image Uploader - Optional */}
                <label htmlFor="tabletDesign" className="mt-5 font-extrabold text-lg">
                    Tablet Design
                </label>
                <input
                    type="file"
                    id="tabletDesign"
                    name="tabletDesign"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border-2 border-gray-300 dark:border-slate-700 focus:outline-primary dark:focus:outline-secondary rounded-md p-2"
                />

                {/* Categories Dropdown Checkbox */}
                <label htmlFor="categories" className="mt-5 font-extrabold text-lg">
                    Categories <span className="text-red-600">*</span>
                </label>
                <p className="text-sm text-gray-500 italic font-extralight">
                    Please select the categories that best describe your solution.
                </p>
                <Select
                    id="categories"
                    name="categories"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={[]}
                    isMulti
                    options={categories}
                    onChange={setSelectedCategories}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                            ...theme.colors,
                            primary25: dropdownBG.hover,
                            primary: dropdownBG.focus,
                            neutral0: dropdownBG.bg
                        }
                    })}
                />

                {/* Difficulty Dropdown Checkbox Single Select */}
                <label htmlFor="difficulty" className="mt-5 font-extrabold text-lg">
                    Difficulty <span className="text-red-600">*</span>
                </label>
                <p className="text-sm text-gray-500 italic font-extralight">
                    Please select the difficulty level of the challenge.
                </p>
                <Select
                    id="difficulty"
                    name="difficulty"
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    defaultValue={[]}
                    isMulti={false}
                    options={difficulty}
                    onChange={setSelectedDifficulty}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                            ...theme.colors,
                            primary25: dropdownBG.hover,
                            primary: dropdownBG.focus,
                            neutral0: dropdownBG.bg
                        }
                    })}
                />

                {/* Supporting File Uploader */}
                <label htmlFor="assetFile" className="mt-5 font-extrabold text-lg">
                    Supporting File <span className="text-red-600">*</span>
                </label>
                <p className="text-sm text-gray-500 italic font-extralight">
                    Please upload your supporting file. (e.g. .zip, .rar) This file should contain
                    README.md and any assets needed for the challenge.
                </p>
                <input
                    type="file"
                    id="assetFile"
                    name="assetFile"
                    accept=".rar, .zip"
                    required
                    onChange={(e) => handleFileChange(e, 5)}
                    className="border-2 border-gray-300 dark:border-slate-700 focus:outline-primary dark:focus:outline-secondary rounded-md p-2"
                />

                {/* Figma URL */}
                <label htmlFor="figma" className="mt-5 font-extrabold text-lg">
                    Figma URL
                </label>
                <input
                    type="url"
                    id="figma"
                    name="figma"
                    placeholder="Figma URL"
                    className="border-2 border-gray-300 dark:border-slate-700 focus:outline-primary dark:focus:outline-secondary rounded-md p-2"
                />

                {/* Assets Dropdown Checkbox Multiple Select */}
                <label htmlFor="assets" className="mt-5 font-extrabold text-lg">
                    Assets in Supporting File<span className="text-red-600">*</span>
                </label>
                <p className="text-sm text-gray-500 italic font-extralight">
                    Please select the content that best describe your supporting file.
                </p>
                <Select
                    id="assets"
                    name="assets"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={[]}
                    isMulti
                    options={assets}
                    onChange={setSelectedAssets}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                            ...theme.colors,
                            primary25: dropdownBG.hover,
                            primary: dropdownBG.focus,
                            neutral0: dropdownBG.bg
                        }
                    })}
                />

                {/* Summary for your Challenge */}
                <label htmlFor="readme" className="mt-5 font-extrabold text-lg">
                    Summary for your challenge <span className="text-red-600">*</span>
                </label>
                <p className="text-sm text-gray-500 italic font-extralight">
                    Please include a summary of your challenge. This will be displayed on the
                    challenge page.
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

                {/* Description for your Challenge */}
                <label htmlFor="readme" className="mt-5 font-extrabold text-lg">
                    Description for your challenge <span className="text-red-600">*</span>
                </label>
                <p className="text-sm text-gray-500 italic font-extralight">
                    Please include a description of your challenge. This should include outline of
                    challenges user will face and important requirements.
                </p>
                {/* BLock Content */}
                <BlockContentInput setDescription={setDescription}></BlockContentInput>

                <button
                    type="submit"
                    className="rounded-full bg-primary dark:bg-secondary p-4 text-white font-bold max-w-lg text-sm xl:text-lg text-center mx-auto w-64 my-5"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default SubmitDesignForm;
