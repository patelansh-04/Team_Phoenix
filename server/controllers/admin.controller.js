import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// GET /api/admin/users
export const getAllUsers = asyncHandler(async (_, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});
