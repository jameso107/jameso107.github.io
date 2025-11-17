# Deployment Guide

This repository uses GitHub Actions to automatically build and deploy the React app to GitHub Pages.

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/jameso107/jameso107.github.io`
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
4. Save the settings

### 2. Push the Workflow File

The GitHub Actions workflow file (`.github/workflows/deploy.yml`) is already created. Just commit and push it:

```bash
git add .github/workflows/deploy.yml vite.config.js
git commit -m "Add GitHub Actions deployment workflow"
git push origin main
```

### 3. Verify Deployment

After pushing:
1. Go to the **Actions** tab in your GitHub repository
2. You should see the workflow running
3. Once complete, your site will be live at `https://syzygy.services` (or your custom domain)

## How It Works

1. **On every push to `main`**, the workflow automatically:
   - Installs Node.js and dependencies
   - Builds the React app using Vite
   - Deploys the `dist/` folder to GitHub Pages

2. **The build process**:
   - Runs `npm ci` to install dependencies
   - Runs `npm run build` to create production build
   - Copies the `CNAME` file to preserve your custom domain
   - Uploads the `dist/` folder to GitHub Pages

## Manual Build (for testing)

To test the build locally:

```bash
npm run build
npm run preview
```

This will build the app and serve it locally so you can verify everything works before pushing.

## Troubleshooting

- **Build fails**: Check the Actions tab for error messages
- **Site not updating**: Wait a few minutes for GitHub Pages to propagate changes
- **Custom domain not working**: Ensure the CNAME file is in the repository root and the workflow copies it to dist

