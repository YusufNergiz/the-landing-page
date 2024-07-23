import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const headers = [
    "Accept", "Accept-Version", "Content-Length",
    "Content-MD5", "Content-Type", "Date", "X-Api-Version",
    "X-CSRF-Token", "X-Requested-With",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: "/api/(.*)",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "https://quicklaunchdesigns.com" },
                    { key: "Access-Control-Allow-Methods", value: "GET,POST" },
                    { key: "Access-Control-Allow-Headers", value: headers.join(", ") }
                ]
            }
        ];
    }
};

export default withNextIntl(nextConfig);
