const restrictToUser = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ error: 'Access denied. Only users can access this route.' });
  }
  next();
};

module.exports = restrictToUser;
