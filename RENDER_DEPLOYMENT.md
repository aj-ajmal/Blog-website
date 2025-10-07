# Render Deployment Guide for Aj Blog

## Prerequisites
1. GitHub account
2. Render account (free)
3. Code pushed to GitHub repository

## Step-by-Step Deployment

### Phase 1: Deploy Backend (JSON Server) First

1. **Go to Render Dashboard**
   - Visit: https://render.com/
   - Sign in with GitHub

2. **Create New Web Service for Backend**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `Blog-website`
   - Configure:
     ```
     Name: aj-blog-api
     Environment: Node
     Build Command: npm install
     Start Command: npm start
     ```

3. **Set Environment Variables (Backend)**
   ```
   NODE_ENV=production
   PORT=10000
   ```

4. **Deploy Backend**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy the backend URL (e.g., `https://aj-blog-api.onrender.com`)

### Phase 2: Deploy Frontend (React App)

1. **Create New Static Site**
   - Click "New +" → "Static Site"
   - Connect same GitHub repository
   - Configure:
     ```
     Name: aj-blog-frontend
     Build Command: npm run build
     Publish Directory: dist
     ```

2. **Set Environment Variables (Frontend)**
   ```
   VITE_API_BASE_URL=https://aj-blog-api.onrender.com
   ```
   *(Replace with your actual backend URL from Phase 1)*

3. **Deploy Frontend**
   - Click "Create Static Site"
   - Wait for deployment (3-5 minutes)

### Phase 3: Test Your Deployed Blog

1. **Access Your Blog**
   - Visit your frontend URL (e.g., `https://aj-blog-frontend.onrender.com`)
   - Test all features:
     - ✅ View blogs
     - ✅ Create new blog
     - ✅ Delete blogs

2. **Common Issues & Solutions**
   - **API not loading**: Check backend URL in environment variables
   - **CORS errors**: Backend should automatically handle this
   - **Build failures**: Check Node.js version compatibility

## Important Notes

- **Free Tier Limitations**: Services sleep after 15 minutes of inactivity
- **Cold Starts**: First request may take 30-60 seconds
- **Custom Domain**: Available with paid plans
- **Automatic Deployments**: Pushes to main branch auto-deploy

## Troubleshooting Commands

```bash
# Check build logs in Render dashboard
# For local testing:
npm run build
npm run preview
```

## Success Indicators
- ✅ Backend service shows "Live" status
- ✅ Frontend site loads without errors
- ✅ Blog data loads from backend
- ✅ Can create/delete blogs

Your blog is now live on the internet! 🚀