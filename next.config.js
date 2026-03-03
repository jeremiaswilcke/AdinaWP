/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.adinawilcke.com',
            },
            {
                protocol: 'https',
                hostname: '**.wp.com',
            },
            {
                protocol: 'https',
                hostname: '**.wordpress.com',
            },
        ],
    },
    // Allow Divi CSS/JS to load
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
