const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const { createBookmark, getBookmarks, getBookmark, updateBookmark, deleteBookmark } = require('../controllers');
const { auth, validate } = require('../middleware');

// Validation rules
const bookmarkValidation = [
  body('url')
    .notEmpty()
    .withMessage('URL is required')
    .isURL()
    .withMessage('Please provide a valid URL'),
  body('title')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
];

const bookmarkUpdateValidation = [
  body('url')
    .optional()
    .isURL()
    .withMessage('Please provide a valid URL'),
  body('title')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
];

// All routes require authentication
router.use(auth);

// Routes
router.route('/')
  .post(bookmarkValidation, validate, createBookmark)
  .get(getBookmarks);

router.route('/:id')
  .get(getBookmark)
  .put(bookmarkUpdateValidation, validate, updateBookmark)
  .delete(deleteBookmark);

module.exports = router;
