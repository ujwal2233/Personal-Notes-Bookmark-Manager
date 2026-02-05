const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const { register, login, getMe, logout } = require('../controllers');
const { auth, validate } = require('../middleware');

// Validation rules
const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Routes
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/me', auth, getMe);
router.post('/logout', logout);

module.exports = router;
