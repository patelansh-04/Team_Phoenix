const jwt = require('jsonwebtoken');

const generateTokens = (user) => {
  // Access token - short lived (15 minutes)
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  // Refresh token - long lived (7 days)
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

const setTokenCookies = (res, { accessToken, refreshToken }) => {
  // Access token cookie
  res.cookie('token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000 // 15 minutes
  });

  // Refresh token cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/api/auth/refresh', // Only sent for refresh requests
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

module.exports = {
  generateTokens,
  setTokenCookies
};
