/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.sanity.io', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com']
    },
    experimental: {
        serverComponentsExternalPackages: ['puppeteer']
    }
};

module.exports = nextConfig;
