# 📚 Blog Website - Full Stack Project

## 🎯 Project Overview
A modern, responsive blog website built with React and Node.js, featuring a beautiful Tailwind CSS design and professional backend API.

## 🚀 Live Demo
- **Frontend**: (Your Render frontend URL)
- **Backend API**: (Your Render backend URL)

## ✨ Features
- 📱 **Responsive Design**: Beautiful on all devices
- ✍️ **Create Blog Posts**: Rich blog creation interface
- 📖 **Read Articles**: Elegant blog reading experience  
- 🗑️ **Delete Posts**: Manage your content
- 🎨 **Modern UI**: Tailwind CSS with gradients and animations
- 🔄 **Real-time Updates**: Instant content updates
- 📊 **Professional API**: RESTful backend with validation

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1**: Modern React with hooks
- **Vite 7.1.2**: Fast build tool and dev server
- **Tailwind CSS 4.1.13**: Utility-first CSS framework
- **React Router 7.9.1**: Client-side routing

### Backend  
- **Node.js**: Runtime environment
- **Express 4.18.2**: Web framework
- **MongoDB Atlas**: Cloud database
- **Mongoose 8.0.0**: MongoDB object modeling

### Deployment
- **Render**: Frontend (Static Site) & Backend (Web Service)
- **MongoDB Atlas**: Database hosting
- **GitHub**: Version control and deployment source

## 📁 Project Structure
```
Blog-website/
├── src/                    # React frontend
│   ├── components/         # React components
│   │   ├── Home.jsx       # Homepage with blog list
│   │   ├── Create.jsx     # Blog creation form
│   │   ├── BlogDetails.jsx # Individual blog view
│   │   ├── BlogList.jsx   # Blog listing component
│   │   └── Navbar.jsx     # Navigation component
│   ├── App.jsx            # Main app component
│   └── main.jsx           # React entry point
├── server/                 # Express backend API
│   ├── index.js           # Main server file
│   ├── package.json       # Backend dependencies
│   └── README.md          # Backend documentation
├── data/                   # Original JSON data
│   └── db.json            # Initial blog data
├── docs/                   # Documentation
└── package.json           # Frontend dependencies
```

## 🚀 Local Development

### Prerequisites
- Node.js 16+
- MongoDB Atlas account
- Git

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup
```bash
# Navigate to server
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB connection string

# Start server
npm start
```

## 🌐 Deployment

### Automated Deployment
Both frontend and backend are configured for automatic deployment on Render:
- **Frontend**: Deploys from main branch root directory
- **Backend**: Deploys from main branch `/server` directory
- **Database**: MongoDB Atlas cloud database

### Environment Variables
- **Frontend**: `VITE_API_BASE_URL` - Backend API URL
- **Backend**: `MONGODB_URI` - MongoDB connection string

## 📊 API Endpoints

```
GET  /                 # API documentation
GET  /blogs           # Get all blogs
GET  /blogs/:id       # Get single blog
POST /blogs           # Create new blog
PUT  /blogs/:id       # Update blog
DELETE /blogs/:id     # Delete blog
```

## 🎨 Design Features
- **Modern Gradient Backgrounds**: Beautiful blue-to-indigo gradients
- **Responsive Grid Layouts**: Adapts to all screen sizes
- **Interactive Cards**: Hover effects and animations
- **Professional Typography**: Clean, readable fonts
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages

## 🔒 Validation & Security
- **Frontend Validation**: Form validation for blog creation
- **Backend Validation**: Server-side data validation
- **CORS Configuration**: Secure cross-origin requests
- **Input Sanitization**: Clean user inputs
- **Error Handling**: Comprehensive error management

## 📈 Performance
- **Optimized Build**: Vite for fast development and builds
- **Code Splitting**: React Router for efficient loading
- **Database Indexing**: MongoDB indexing for fast queries
- **Production Ready**: Optimized for production deployment

## 🤝 Contributing
This is a portfolio project, but suggestions and improvements are welcome!

## 📄 License
MIT License - feel free to use this project as inspiration for your own blog!

## 👨‍💻 Developer
**AJ Ajmal**
- GitHub: [@aj-ajmal](https://github.com/aj-ajmal)
- Project: [Blog-website](https://github.com/aj-ajmal/Blog-website)

---

*Built with ❤️ using React, Node.js, and modern web technologies*