/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/volam-meme-analyzer' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/volam-meme-analyzer/' : '',
}

module.exports = nextConfig
