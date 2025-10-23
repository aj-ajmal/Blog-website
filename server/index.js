const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route for health check
app.get('/', (req, res) => {
  res.json({
    message: 'Blog API Server is running!',
    version: '1.0.0',
    endpoints: {
      'GET /blogs': 'Get all blogs',
      'GET /blogs/:id': 'Get single blog by ID',
      'POST /blogs': 'Create new blog',
      'PUT /blogs/:id': 'Update blog by ID (full update)', // <-- MODIFIED
      'PATCH /blogs/:id': 'Update blog by ID (partial update)', // <-- MODIFIED
      'DELETE /blogs/:id': 'Delete blog by ID'
    }
  });
});

// Connect to MongoDB with retry and without exiting process on failure
const connectDB = async (retries = 5, delay = 5000) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');
    dbConnected = true;
    return true;
  } catch (error) {
    dbConnected = false;
    console.error('❌ MongoDB connection error:', error.message);

    if (retries > 0) {
      console.log(`Retrying MongoDB connection in ${delay / 1000}s... (${retries} retries left)`);
      // wait and retry
      await new Promise((resolve) => setTimeout(resolve, delay));
      return connectDB(retries - 1, delay);
    }

    console.error('⚠️  Could not connect to MongoDB after multiple attempts. Server will continue running but DB operations will fail until connection is available.');
    return false;
  }
};

// Blog Schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxLength: [200, 'Title cannot be more than 200 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    maxLength: [100, 'Author name cannot be more than 100 characters']
  },
  about: {
    type: String,
    trim: true,
    maxLength: [500, 'About section cannot be more than 500 characters']
  },
  body: {
    type: String,
    required: [true, 'Blog content is required'],
    minLength: [250, 'Blog content must be at least 250 characters']
  },
  publishdate: {
    type: Date,
    default: Date.now
  },
  default: {
    type: String,
    default: 'user'
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

const Blog = mongoose.model('Blog', blogSchema);

// API Routes

// Health check endpoint that returns DB connection status
let dbConnected = false;
app.get('/health', (req, res) => {
  const state = mongoose.connection.readyState; // 0 = disconnected, 1 = connected
  res.json({
    status: 'ok',
    dbConnected,
    mongooseState: state
  });
});


// GET /blogs - Get all blogs
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ publishdate: -1 });
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch blogs'
    });
  }
});

// GET /blogs/:id - Get single blog by ID
app.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        error: 'Blog not found',
        message: `Blog with ID ${req.params.id} does not exist`
      });
    }

    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid blog ID',
        message: 'The provided ID is not valid'
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch blog'
    });
  }
});

// POST /blogs - Create new blog
app.post('/blogs', async (req, res) => {
  try {
    const { title, author, about, body } = req.body;

    // Validation
    if (!title || !author || !body) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Title, author, and body are required'
      });
    }

    if (body.length < 250) {
      return res.status(400).json({
        error: 'Content too short',
        message: 'Blog content must be at least 250 characters'
      });
    }

    const newBlog = new Blog({
      title,
      author,
      about,
      body,
      publishdate: new Date()
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error creating blog:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        message: error.message
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create blog'
    });
  }
});

// PUT /blogs/:id - Update blog by ID
app.put('/blogs/:id', async (req, res) => {
  try {
    const { title, author, about, body } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, author, about, body },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(44).json({
        error: 'Blog not found',
        message: `Blog with ID ${req.params.id} does not exist`
      });
    }

    res.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid blog ID',
        message: 'The provided ID is not valid'
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        message: error.message
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update blog'
    });
  }
});

// <-- NEW ROUTE ADDED -->
// PATCH /blogs/:id - Partially update blog by ID
app.patch('/blogs/:id', async (req, res) => {
  try {
    // For PATCH, Mongoose updates only the fields present in req.body
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body, // Pass req.body directly to update only provided fields
      { new: true, runValidators: true } // 'new: true' returns the updated doc
    );

    if (!updatedBlog) {
      return res.status(404).json({
        error: 'Blog not found',
        message: `Blog with ID ${req.params.id} does not exist`
      });
    }

    res.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog (PATCH):', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid blog ID',
        message: 'The provided ID is not valid'
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        message: error.message
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update blog'
    });
  }
});

// DELETE /blogs/:id - Delete blog by ID
app.delete('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        error: 'Blog not found',
        message: `Blog with ID ${req.params.id} does not exist`
      });
    }

    res.json({
      message: 'Blog deleted successfully',
      deletedBlog: blog
    });
  } catch (error) {
    console.error('Error deleting blog:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid blog ID',
        message: 'The provided ID is not valid'
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to delete blog'
    });
  }
});

// 404 handler for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `${req.method} ${req.originalUrl} is not a valid endpoint`
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong on the server'
  });
});

// Start server
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 API Docs: http://localhost:${PORT}/`);
    console.log(`🔗 Health Check: http://localhost:${PORT}/`);
  });
};

startServer();