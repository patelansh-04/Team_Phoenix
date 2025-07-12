const rateLimit = require('express-rate-limit');

// Rate limiting configuration
const createLimiter = (minutes, max) => {
  return rateLimit({
    windowMs: minutes * 60 * 1000,
    max: max,
    message: {
      error: `Too many attempts from this IP, please try again after ${minutes} minutes`
    },
    standardHeaders: true,
    legacyHeaders: false
  });
};

// Login attempts limiter: 5 attempts per 15 minutes
const loginLimiter = createLimiter(15, 5);

// Registration limiter: 3 attempts per 60 minutes
const registerLimiter = createLimiter(60, 3);

// General API limiter: 100 requests per minute
const apiLimiter = createLimiter(1, 100);

module.exports = {
  loginLimiter,
  registerLimiter,
  apiLimiter
};
