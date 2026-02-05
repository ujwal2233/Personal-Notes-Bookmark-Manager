const authController = require('./authController');
const noteController = require('./noteController');
const bookmarkController = require('./bookmarkController');

module.exports = {
  ...authController,
  ...noteController,
  ...bookmarkController
};
