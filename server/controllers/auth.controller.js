import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/', // ✅ Add this
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};


// POST /api/auth/signup
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.findOne({ email })) throw new Error('Email already registered');
  hashedPassword = bcrypt.hashSync(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  generateToken(res, user._id);
  res.status(201).json({ success: true, user });
});


// POST /api/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1️⃣  Find the user by email ONLY and explicitly select the hashed password
  const user = await User.findOne({ email }).select('+password');

  // 2️⃣  If no user or password mismatch → 401
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // 3️⃣  Issue JWT cookie and return safe user object
  generateToken(res, user._id);
  const { password: _pw, ...safeUser } = user.toObject();
  res.json({ success: true, user: safeUser });
});

// POST /api/auth/logout
export const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/', // ✅ Must match the set path
  });
  res.status(200).json({ success: true });
};
