import { clientSanity as client } from './sanity.client';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';
import { schema } from '@/../sanity/schema';
const { JSDOM } = require('jsdom');
const axios = require('axios');

// Start with compiling block schema we can work against
const defaultSchema = Schema.compile(schema);

// The compiled schema type for the content type that holds the block array
const blockContentType = defaultSchema.get('blockContent');

// Upload image to sanity and retrieve asset ID
async function uploadImage(imageFile) {
    return new Promise(async (resolve, reject) => {
        try {
            const base64Image = imageFile.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Image, 'base64');

            const uploadResult = await client.assets.upload('image', buffer, {
                filename: 'Uploaded with sanityDatabaseService'
            });

            // console.log('uploadResult: ', uploadResult);

            resolve(uploadResult._id);
        } catch (error) {
            // console.log('error: ', error);
            reject(error);
        }
    });
}

async function uploadFile(file) {
    return new Promise(async (resolve, reject) => {
        try {
            const base64File = file.replace(/^data:application\/\w+;base64,/, '');
            const buffer = Buffer.from(base64File, 'base64');

            const uploadResult = await client.assets.upload('file', buffer, {
                filename: 'Uploaded with sanityDatabaseService'
            });

            // console.log('uploadResult: ', uploadResult);

            resolve(uploadResult._id);
        } catch (error) {
            // console.log('error: ', error);
            reject(error);
        }
    });
}

// delete images with _createdAt greater than June 1, 2023
const deleteImages = async () => {
    const query = '*[_type == "sanity.imageAsset" && _createdAt > "2023-06-01T00:00:00Z"]';
    const images = await client.fetch(query);

    console.log('images: ', images);

    images.forEach(async (image) => {
        const deleteResult = await client.delete(image._id);
        console.log('deleteResult: ', deleteResult);
    });
};

async function convertHtmlToBlocks(content) {
    return new Promise(async (resolve, reject) => {
        try {
            let index = 0;
            let imageLibrary = [];
            // deleteImages();
            // console.log('inside convertHtmlToBlocks promise');

            const convertedBlocks = htmlToBlocks(content, blockContentType, {
                parseHtml: (html) => new JSDOM(html).window.document,
                rules: [
                    // Special rule for code blocks
                    {
                        deserialize(el, next, block) {
                            // console.log('el: ', el);
                            if (el.tagName?.toLowerCase() === 'img') {
                                const src = el.getAttribute('src');
                                const alt = el.getAttribute('alt');
                                // console.log('el: ', el);
                                // Create block object for each image
                                const imageBlock = {
                                    _type: 'image',
                                    asset: {
                                        _type: 'reference',
                                        _ref: 'toReplace' + index
                                    }
                                    // Add any other relevant metadata fields
                                };
                                imageLibrary.push(src);
                                index++;
                                return block(imageBlock);
                            }
                            // console.log('before return undefined');
                            // Continue with default conversion for other elements
                            return undefined;
                        }
                    }
                ]
            });

            // console.log('convertedBlocks: ', convertedBlocks);

            const promises = imageLibrary.map(async (image, i) => {
                if (image.includes('http')) {
                    const asset_id = await uploadImageFromUrl(image);
                    return asset_id;
                }
                const asset_id = await uploadImage(image);
                return asset_id;
            });

            const resolvedImageIds = await Promise.all(promises);

            let stringifiedBlocks = JSON.stringify(convertedBlocks);

            resolvedImageIds.forEach((imageId, i) => {
                stringifiedBlocks = stringifiedBlocks.replace('toReplace' + i, imageId);
            });

            const resolvedBlocks = JSON.parse(stringifiedBlocks);

            resolve(resolvedBlocks);
        } catch (error) {
            reject(error);
        }
    });
}

// Upload Image to sanity and retrieve asset ID from image URL
async function uploadImageFromUrl(imageUrl) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data, 'binary');

            const uploadResult = await client.assets.upload('image', buffer, {
                filename: 'Uploaded with sanityDatabaseService'
            });

            // console.log('uploadResult: ', uploadResult);

            resolve(uploadResult._id);
        } catch (error) {
            // console.log('error: ', error);
            reject(error);
        }
    });
}

// Register author in Sanity database
async function registerAuthor(user) {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, displayName, photoURL, uid } = user;

            const pictureId = await uploadImageFromUrl(photoURL);
            const image = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: pictureId
                }
            };

            const author = {
                _type: 'author',
                name: displayName,
                username: email,
                image,
                slug: {
                    _type: 'slug',
                    current: displayName.replace(/\s+/g, '-').toLowerCase()
                },
                _id: uid
            };

            const authorResult = await client.createOrReplace(author);

            resolve(authorResult._id);
        } catch (error) {
            reject(error);
        }
    });
}

// Write Challenge data to Sanity database
async function writeNewSolutionData(challenge) {
    // console.log('inside writeNewSolutionData');
    return new Promise(async (resolve, reject) => {
        try {
            // Deconstruct challenge data
            let {
                title,
                figma_url,
                summary,
                description,
                slug,
                publishedAt,
                desktopDesign,
                mobileDesign,
                tabletDesign,
                assetFiles,
                author,
                user,
                categories,
                difficulty,
                assets
            } = challenge;

            // console.log('description: ', description);

            const blocks = await convertHtmlToBlocks(description);

            if (!author) {
                const temp = await registerAuthor(user);
                author = {
                    _type: 'reference',
                    _ref: temp
                };
            } else {
                author = {
                    _type: 'reference',
                    _ref: author._id
                };
            }

            // Parse Categories
            categories = categories.map((category) => {
                return {
                    _type: 'reference',
                    _ref: category.value,
                    _key: category.value
                };
            });

            // Parse Assets
            assets = assets.map((asset) => {
                return {
                    _type: 'reference',
                    _ref: asset.value,
                    _key: asset.value
                };
            });

            // Parse Difficulty
            difficulty = {
                _type: 'reference',
                _ref: difficulty.value
            };

            const newSolution = {
                _type: 'challenge',
                title,
                figma_url,
                summary,
                description: blocks,
                slug: {
                    _type: 'slug',
                    current: slug
                },
                publishedAt,
                author,
                categories,
                difficulty,
                assets
            };

            // console.log('newSolution: ', newSolution);

            // console.log('desktopDesign: ', desktopDesign);
            // console.log('mobileDesign: ', mobileDesign);
            // console.log('tabletDesign: ', tabletDesign);
            // console.log('assetFiles: ', assetFiles);
            if (desktopDesign) {
                const desktopImage = await uploadImage(desktopDesign);
                desktopDesign = {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: desktopImage
                    }
                };
                newSolution.desktopDesign = desktopDesign;
            }
            if (mobileDesign) {
                const mobileImage = await uploadImage(mobileDesign);
                mobileDesign = {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: mobileImage
                    }
                };
                newSolution.mobileDesign = mobileDesign;
            }
            if (tabletDesign) {
                const tabletImage = await uploadImage(tabletDesign);
                tabletDesign = {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: tabletImage
                    }
                };
                newSolution.tabletDesign = tabletDesign;
            }
            if (assetFiles) {
                const assetImage = await uploadFile(assetFiles);
                assetFiles = {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: assetImage
                    }
                };
                newSolution.files = assetFiles;
            }

            // const data = {
            //     desktopDesign: event.target.desktopDesign.value,
            //     tabletDesign: event.target.tabletDesign.value,
            //     mobileDesign: event.target.mobileDesign.value,
            //     categories: selectedCategories,
            //     difficulty: selectedDifficulty,
            //     assetFiles: event.target.assetFile.value,
            //     assets: selectedAssets,
            //     uid: author,
            // };

            const response = await client.create(newSolution);
            console.log('response: ', response);

            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}

export { writeNewSolutionData };
