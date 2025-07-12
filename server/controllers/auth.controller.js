import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
  return token;
};

// POST /api/auth/signup
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.findOne({ email })) throw new Error('Email already registered');
  const user = await User.create({ name, email, password });
  generateToken(res, user._id);
  res.status(201).json({ success: true, user });
});

// POST /api/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({ success: true, user });
  } else {
    
    throw new Error('Invalid credentials');
  }
});

// POST /api/auth/logout
export const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
};
