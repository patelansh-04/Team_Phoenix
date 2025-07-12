const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User.model');

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

const setTokenCookies = (res, { accessToken, refreshToken }) => {
  res.cookie('token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000 // 15 minutes
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/api/auth/refresh',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

// POST /api/auth/register
const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      name, 
      email, 
      password: hashed,
      points: 50,
      role: 'user'
    });

    const tokens = generateTokens(user);
    await user.addRefreshToken(tokens.refreshToken);
    setTokenCookies(res, tokens);

    return res.status(201).json({ 
      id: user._id,
      name: user.name,
      email: user.email,
      points: user.points,
      role: user.role
    });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const tokens = generateTokens(user);
    await user.addRefreshToken(tokens.refreshToken);
    setTokenCookies(res, tokens);

    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      points: user.points,
      isAdmin: user.role === 'admin'
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /api/auth/refresh
const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify if the refresh token is still valid in the database
    const validToken = user.refreshTokens.find(t => t.token === refreshToken);
    if (!validToken) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    // Generate new tokens
    const tokens = generateTokens(user);
    
    // Replace old refresh token with new one
    await user.revokeRefreshToken(refreshToken);
    await user.addRefreshToken(tokens.refreshToken);
    
    setTokenCookies(res, tokens);

    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      points: user.points,
      isAdmin: user.role === 'admin'
    });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
};

// POST /api/auth/logout
const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const user = await User.findById(decoded.id);
      if (user) {
        await user.revokeRefreshToken(refreshToken);
      }
    } catch (error) {
      // Ignore token verification errors during logout
    }
  }

  res.cookie('token', '', { maxAge: 0 });
  res.cookie('refreshToken', '', { maxAge: 0, path: '/api/auth/refresh' });
  res.status(200).json({ message: 'Logged out successfully' });
};

// GET /api/auth/me
const me = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      points: user.points,
      isAdmin: user.role === 'admin'
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  me
};
