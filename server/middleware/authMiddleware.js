import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token =
    req.cookies?.token ??
    (req.headers.authorization?.startsWith('Bearer')
      ? req.headers.authorization.split(' ')[1]
      : null);

  if (!token) return res.status(401).json({ success: false, message: 'Not authorised' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Token failed' });
  }
};

export const admin = (req, res, next) =>
  req.user?.isAdmin ? next() : res.status(403).json({ success: false, message: 'Admin only' });
