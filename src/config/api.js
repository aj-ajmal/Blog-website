// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  blogs: `${API_BASE_URL}/blogs`,
  getBlog: (id) => `${API_BASE_URL}/blogs/${id}`,
  createBlog: `${API_BASE_URL}/blogs`,
  deleteBlog: (id) => `${API_BASE_URL}/blogs/${id}`,
};

export default API_BASE_URL;