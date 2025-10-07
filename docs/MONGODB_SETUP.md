# MongoDB Atlas Setup Guide

## Database Structure
Your blog data will be stored in MongoDB with the following structure:

```javascript
{
  _id: ObjectId("..."),          // MongoDB generated ID
  title: String,                 // Blog title
  author: String,                // Author name
  about: String,                 // Short description/preview
  body: String,                  // Full blog content
  publishdate: Date,             // Publication date
  default: String                // Category/type (optional)
}
```

## Step-by-Step MongoDB Atlas Setup

### 1. Create Account and Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create new project: "Blog Website"
4. Build cluster: Choose M0 (Free tier)
5. Select cloud provider and region closest to you

### 2. Configure Security
1. **Database Access:**
   - Go to Database Access > Add New Database User
   - Username: `bloguser` (or your choice)
   - Password: Generate strong password (save it!)
   - Database User Privileges: Read and write to any database

2. **Network Access:**
   - Go to Network Access > Add IP Address
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

### 3. Get Connection String
1. Go to Clusters > Connect
2. Choose "Connect your application"
3. Driver: Node.js, Version: 4.1 or later
4. Copy connection string:
   ```
   mongodb+srv://bloguser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password

### 4. Create Database and Collection
1. Go to Collections > Create Database
   - Database name: `blogDB`
   - Collection name: `blogs`

### 5. Import Your Blog Data
Option A: Using MongoDB Compass (Recommended)
1. Download MongoDB Compass
2. Connect using your connection string
3. Navigate to blogDB.blogs collection
4. Click Import Data > Select your db.json file
5. Import format: JSON
6. Select only the "blogs" array

Option B: Manual Import
1. In Atlas Collections view
2. Click "Insert Document"
3. Copy each blog object from your db.json
4. Paste and save each one

### 6. Verify Data Import
After import, you should see 3 documents in your blogs collection:
- Atomic Habits (James Clear)
- Mindset (Carol S. Dweck)
- The 7 Habits (Stephen Covey)

## Connection String for Backend
Save this connection string (with your password) - you'll need it for the backend:
```
mongodb+srv://bloguser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/blogDB?retryWrites=true&w=majority
```

✅ **Ready for Next Step:** Create Node.js Backend