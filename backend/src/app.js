const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const config = require('./config');
const { errorHandler } = require('./middleware');
const { authRoutes, noteRoutes, bookmarkRoutes } = require('./routes');

const app = express();

// CORS configuration
app.use(cors({
  origin: config.frontendUrl,
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler middleware
app.use(errorHandler);

module.exports = app;
