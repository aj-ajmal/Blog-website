# Render Deployment Instructions

## Backend Deployment (Web Service)

### 1. Push Backend to GitHub
First, ensure your server folder is committed to your repository:

```bash
git add .
git commit -m "Add production-ready Express backend API"
git push origin main
```

### 2. Create Render Web Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** > **Web Service**
3. Select your GitHub repository: `aj-ajmal/Blog-website`

### 3. Configure Web Service Settings
```
General:
- Name: blog-backend-api (or your choice)
- Region: Choose closest to you
- Branch: main
- Root Directory: server
- Runtime: Node

Build & Deploy:
- Build Command: npm install
- Start Command: npm start

Advanced:
- Auto-Deploy: Yes (recommended)
```

### 4. Environment Variables
In the Environment tab, add:
```
MONGODB_URI = mongodb+srv://bloguser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/blogDB?retryWrites=true&w=majority
```
(Replace with your actual MongoDB connection string)

### 5. Deploy
1. Click **Create Web Service**
2. Wait for deployment (usually 2-3 minutes)
3. Render will provide your backend URL: `https://your-backend-name.onrender.com`

### 6. Test Your Backend
Visit your backend URL to see the API documentation and confirm it's working.

## Frontend Deployment (Static Site)

### 1. Create Render Static Site
1. Click **New +** > **Static Site**
2. Select the same GitHub repository
3. Configure settings:

```
General:
- Name: blog-frontend (or your choice)
- Branch: main
- Root Directory: (leave empty - deploys from root)

Build & Deploy:
- Build Command: npm install && npm run build
- Publish Directory: dist

Environment Variables:
- VITE_API_BASE_URL = https://your-backend-name.onrender.com
```

### 7. Deploy and Connect
1. Click **Create Static Site**
2. After deployment, your blog will be live!
3. Frontend URL: `https://your-frontend-name.onrender.com`

## Final Result
- ✅ Frontend: Live React blog website
- ✅ Backend: Professional API with MongoDB
- ✅ Database: Cloud MongoDB Atlas
- ✅ Fully functional CRUD operations
- ✅ Production-ready deployment

Your blog is now a professional full-stack application!