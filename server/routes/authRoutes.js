const express = require('express');
const { register, login, logout, refresh, me } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { loginLimiter, registerLimiter } = require('../middleware/rateLimiter');
const { registerValidation, loginValidation, validate } = require('../middleware/validationMiddleware');

const router = express.Router();

// Public routes with rate limiting and validation
router.post('/register', registerLimiter, registerValidation, validate, register);
router.post('/login', loginLimiter, loginValidation, validate, login);
router.post('/refresh', refresh);

// Protected routes
router.post('/logout', authMiddleware, logout);
router.get('/me', authMiddleware, me);

module.exports = router;
