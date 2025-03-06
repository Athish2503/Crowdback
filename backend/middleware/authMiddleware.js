const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust the path to your User model

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    // console.log('Authorization Header:', req.header('Authorization'));


    if (!authHeader) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : authHeader;

    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
