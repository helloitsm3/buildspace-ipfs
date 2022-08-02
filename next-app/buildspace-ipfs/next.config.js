/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    images: {
        domains: ["arweave.net", "ipfs.io"],
    },
};

module.exports = nextConfig;
