const jwt = require('jsonwebtoken');
const JWT_SECRET = 'team_phoenix_secret_key';

const fetchuser = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    console.log(token);

    if (!token) {
      return res.status(401).json({ error: 'Invalid access!! Login Required' });
    }

    const user = jwt.verify(token, JWT_SECRET);
    if (!user) {
      return res.status(401).json({ error: 'Invalid access' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = fetchuser;
