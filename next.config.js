/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for static export
  basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '', // Replace with your repo name
  assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '', // Same as above
}

module.exports = nextConfig