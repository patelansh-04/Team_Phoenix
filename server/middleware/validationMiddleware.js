const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

// Rate limiting middleware
const createRateLimiter = (minutes, max) => {
  return rateLimit({
    windowMs: minutes * 60 * 1000,
    max: max,
    message: { error: `Too many attempts. Please try again after ${minutes} minutes.` }
  });
};

// Login rate limiter - 5 attempts per 15 minutes
const loginLimiter = createRateLimiter(15, 5);

// Registration rate limiter - 3 attempts per 60 minutes
const registerLimiter = createRateLimiter(60, 3);

// Validation chains
const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character'),
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long')
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage('Name can only contain letters and spaces')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').not().isEmpty()
];

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  loginLimiter,
  registerLimiter,
  registerValidation,
  loginValidation,
  validate
};
