# GitHub Pages Deployment Guide

This guide explains how to deploy the VOLaM Meme Analyzer to GitHub Pages.

## Prerequisites

1. A GitHub account
2. A GitHub repository for your project
3. The project configured for static export (already done)

## Setup Instructions

### 1. Repository Setup

1. Create a new repository on GitHub named `volam-meme-analyzer`
2. Push your local code to the repository:

```bash
git init
git add .
git commit -m "Initial commit: VOLaM Meme Analyzer"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/volam-meme-analyzer.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**

### 3. Automatic Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) is already configured and will:

- Trigger on every push to the `main` branch
- Install dependencies
- Build the static site
- Deploy to GitHub Pages

### 4. Access Your Site

After the first successful deployment, your site will be available at:
```
https://YOUR_USERNAME.github.io/volam-meme-analyzer/
```

## Configuration Details

### Next.js Configuration

The `next.config.js` file is configured for static export:

```javascript
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/volam-meme-analyzer' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/volam-meme-analyzer/' : '',
}
```

### GitHub Actions Workflow

The deployment workflow:
- Uses Node.js 18
- Installs dependencies with `npm ci`
- Builds the project with `npm run build`
- Deploys the `out` directory to GitHub Pages

## Local Testing

To test the production build locally:

```bash
# Build the static site
npm run build

# Serve the static files (you'll need a static server)
npx serve out
```

## Troubleshooting

### Common Issues

1. **404 on page refresh**: This is normal for static sites with client-side routing. GitHub Pages serves the 404.html for unknown routes.

2. **Assets not loading**: Check that the `basePath` and `assetPrefix` in `next.config.js` match your repository name.

3. **Build failures**: Check the Actions tab in your GitHub repository for detailed error logs.

### Build Requirements

- All dynamic routes must have `generateStaticParams()` functions
- No server-side features (API routes, server components with dynamic data)
- All images must be optimized or use `unoptimized: true`

## Features Available in Static Build

✅ **Working Features:**
- Dashboard with meme analysis
- 3D visualization
- Educational modules
- Meme creation and editing (client-side only)
- Settings configuration (localStorage)
- LLM analysis (with API keys)

❌ **Not Available:**
- Server-side data persistence
- API routes
- Real-time features
- Server-side authentication

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public` directory with your domain
2. Configure DNS settings with your domain provider
3. Update the `basePath` in `next.config.js` to an empty string

## Security Notes

- API keys are stored in localStorage (client-side only)
- No sensitive data should be committed to the repository
- Consider using environment variables for production API keys
