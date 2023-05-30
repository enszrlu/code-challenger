/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.sanity.io', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com']
    },
    experimental: {
        serverComponentsExternalPackages: ['puppeteer', 'puppeteer-core']
    }
};

module.exports = nextConfig;
