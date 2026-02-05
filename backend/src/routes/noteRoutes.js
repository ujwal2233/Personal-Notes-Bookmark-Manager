const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const { createNote, getNotes, getNote, updateNote, deleteNote } = require('../controllers');
const { auth, validate } = require('../middleware');

// Validation rules
const noteValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('content')
    .notEmpty()
    .withMessage('Content is required')
];

const noteUpdateValidation = [
  body('title')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters')
];

// All routes require authentication
router.use(auth);

// Routes
router.route('/')
  .post(noteValidation, validate, createNote)
  .get(getNotes);

router.route('/:id')
  .get(getNote)
  .put(noteUpdateValidation, validate, updateNote)
  .delete(deleteNote);

module.exports = router;
