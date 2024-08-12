const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  if (req.isAuthenticated()) {
    return next();
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.userId);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
