#!/bin/bash

# GitHub Pages Setup Script for VOLaM Meme Analyzer

echo "🚀 Setting up GitHub Pages deployment for VOLaM Meme Analyzer"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if we have a remote
if ! git remote get-url origin > /dev/null 2>&1; then
    echo ""
    echo "🔗 Setting up GitHub remote..."
    echo "Please enter your GitHub username:"
    read -r username
    
    echo "Please enter your repository name (default: volam-meme-analyzer):"
    read -r repo_name
    repo_name=${repo_name:-volam-meme-analyzer}
    
    git remote add origin "https://github.com/$username/$repo_name.git"
    echo "✅ Remote origin set to: https://github.com/$username/$repo_name.git"
else
    echo "✅ Git remote already configured"
fi

# Add all files and commit
echo ""
echo "📦 Adding files and creating initial commit..."
git add .

# Check if there are any changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit"
else
    git commit -m "Initial commit: VOLaM Meme Analyzer with GitHub Pages setup"
    echo "✅ Initial commit created"
fi

# Set main branch
echo ""
echo "🌿 Setting up main branch..."
git branch -M main

# Test build
echo ""
echo "🔨 Testing production build..."
if npm run build; then
    echo "✅ Build successful! Static files generated in 'out' directory"
else
    echo "❌ Build failed! Please fix errors before deploying"
    exit 1
fi

echo ""
echo "🎉 Setup complete! Next steps:"
echo ""
echo "1. Create a new repository on GitHub named '$repo_name'"
echo "2. Push your code:"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to your repository on GitHub"
echo "   - Click Settings > Pages"
echo "   - Under 'Source', select 'GitHub Actions'"
echo ""
echo "4. Your site will be available at:"
echo "   https://$username.github.io/$repo_name/"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
