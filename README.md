# Volatown - GitHub + Vercel Ready

This project is a static web game and is ready to be uploaded to GitHub and deployed on Vercel.

## Project type
- Static site
- No build step required
- Entry file: `index.html`

## Recommended Vercel settings
- Framework Preset: `Other`
- Build Command: leave blank
- Output Directory: `.`

## Deploy with GitHub + Vercel
1. Create a new GitHub repository.
2. Upload all files from this folder to the repository root.
3. In Vercel, choose **Add New Project**.
4. Import the GitHub repository.
5. If Vercel asks for settings, use:
   - Framework Preset: `Other`
   - Build Command: blank
   - Output Directory: `.`
6. Deploy.

## Notes
- `vercel.json` is already included.
- `.vercel/` was removed on purpose so the project is not tied to any previous local Vercel account.
- `netlify.toml` is kept only for compatibility/reference and does not affect Vercel deployment.
