# Render deployment configuration

# Build Command (for frontend):
npm run build

# Start Command (for backend JSON server):
npm start

# Environment Variables to set in Render:
# VITE_API_BASE_URL=https://your-blog-api.onrender.com

# Deploy Instructions:
# 1. Create two services on Render:
#    - Web Service (Frontend): Build & deploy React app
#    - Web Service (Backend): Deploy JSON server

# Frontend Service Configuration:
# - Build Command: npm run build
# - Publish Directory: dist
# - Start Command: (leave empty for static site)

# Backend Service Configuration:
# - Build Command: npm install
# - Start Command: npm start
# - Environment Variables: NODE_ENV=production