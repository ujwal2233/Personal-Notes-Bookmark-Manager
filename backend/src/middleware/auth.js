const { User } = require('../models');

const auth = async (req, res, next) => {
  try {
    // Get user ID from cookie
    const userId = req.cookies.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Please login.'
      });
    }

    // Find user by id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Please login again.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed.'
    });
  }
};

module.exports = auth;
