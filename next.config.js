/** @type {import('next').NextConfig} */
const nextConfig = {
    target: 'server',
    output: "standalone",
    env: {
        API_HOST_URL: process.env.API_HOST_URL
    },
    // 👇 正确写法！16.1.6 能用
    experimental: {
        // 空着就行，不要写 turbopack
    }
}

/*
原来的旧配置（已废弃）
const nextConfig = {
    target: 'server',
    output: "standalone",
    env: {
        API_HOST_URL: process.env.API_HOST_URL
    }
};
*/

module.exports = nextConfig;