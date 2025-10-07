# Deploy to Render

## One-Click Deploy

### Backend API
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/aj-ajmal/Blog-website)

### Manual Deploy Steps
Since Render requires web dashboard for first deployment:

1. **Backend**: https://render.com/deploy
   - Repository: `https://github.com/aj-ajmal/Blog-website`
   - Service Type: Web Service
   - Build: `npm install`
   - Start: `npm start`

2. **Frontend**: https://render.com/deploy
   - Repository: `https://github.com/aj-ajmal/Blog-website`
   - Service Type: Static Site
   - Build: `npm run build`
   - Publish: `dist`
   - Environment: `VITE_API_BASE_URL=https://your-backend-url.onrender.com`

## Auto-Deploy
After initial setup, pushes to `main` branch will auto-deploy!