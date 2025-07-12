const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware');
const { register, login, logout, checkLoggedin } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Just verify user if user is logged in, for checking frontend routes access
router.get('/me', authMiddleware, checkLoggedin);

module.exports = router;
