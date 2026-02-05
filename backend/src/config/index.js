const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/notes_bookmarks_db',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
};
