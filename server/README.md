# Backend API Documentation

## Overview
Professional Node.js/Express API that replaces json-server with a production-ready backend.

## Features
- ✅ Full CRUD operations for blog posts
- ✅ MongoDB Atlas integration
- ✅ Input validation and error handling
- ✅ CORS enabled for frontend access
- ✅ Professional API responses
- ✅ Health check endpoint

## API Endpoints

### Health Check
```
GET /
Response: API information and available endpoints
```

### Blog Operations
```
GET /blogs
- Get all blogs (sorted by publish date, newest first)

GET /blogs/:id
- Get single blog by MongoDB ID

POST /blogs
- Create new blog
- Body: { title, author, about, body }
- Validation: title, author, body required; body min 250 chars

PUT /blogs/:id
- Update existing blog
- Body: { title, author, about, body }

DELETE /blogs/:id
- Delete blog by ID
- Returns confirmation message
```

## Error Handling
- 400: Bad Request (validation errors, invalid ID)
- 404: Not Found (blog doesn't exist)
- 500: Internal Server Error

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment
1. Copy `.env.example` to `.env`
2. Replace `YOUR_PASSWORD` with your MongoDB Atlas password
3. Update connection string with your cluster details

### 3. Run Locally
```bash
npm start
# or for development
npm run dev
```

### 4. Test API
Visit http://localhost:8000 to see API documentation

## Deployment Ready
This backend is optimized for Render deployment with:
- Environment variable configuration
- Production error handling
- CORS setup for frontend integration
- Health check endpoint