const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded) {
      const getUser = await User.findOne({ _id: decoded.id }).select("email");
      if (!getUser) return res.status(404).json({ message: "User not found" });

      req.user = { id: decoded.id, role: decoded.role };
      next();
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
