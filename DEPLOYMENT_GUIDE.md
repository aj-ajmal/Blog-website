# Blog Website Deployment Guide

## Step 1: Deploy React Frontend to Render

### Frontend Configuration
Your frontend is now configured to use environment variables:
- Development: `VITE_API_BASE_URL=http://localhost:8000`
- Production: Will be updated with live backend URL

### Render Static Site Setup
1. Go to [Render.com](https://render.com) and sign up
2. Click **New +** > **Static Site**
3. Connect your GitHub repository: `aj-ajmal/Blog-website`
4. Configure the settings:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
   - **Environment Variables:**
     - `VITE_API_BASE_URL`: (will be set to your backend URL later)

## Step 2: Set Up MongoDB Atlas Database

### Database Setup
1. Go to [MongoDB.com](https://mongodb.com) and create free Atlas account
2. Create new project and build free cluster (M0 Shared tier)
3. Set up security:
   - Database Access: Create database user (remember username/password)
   - Network Access: Add IP Address > "Allow Access From Anywhere" (0.0.0.0/0)
4. Get connection string:
   - Cluster > Connect > Connect your application
   - Copy connection string: `mongodb+srv://<username>:<password>@...`
5. Import your blog data:
   - Collections tab > Create database: `blogDB`
   - Create collection: `blogs`
   - Import data from your `data/db.json` file

## Step 3: Create Node.js/Express Backend

The backend will be created in the next step to replace json-server with a production-ready API.

## Step 4: Deploy Backend to Render

Backend will be deployed as a Web Service with MongoDB connection.

## Step 5: Connect Frontend to Production Backend

Frontend will be updated to use the production backend URL.

---

## Current Status: ✅ Frontend Ready for Deployment

Your React app is now configured with environment variables and ready for deployment to Render!