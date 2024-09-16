const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path according to your project structure

const adminAuth = async (req, res, next) => {
  try {
    console.log(req.body)
    // Extract token from Authorization header
    const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
      ? req.headers.authorization.split(' ')[1]
      : null;

      console.log(token)
    if (!token) return res.status(401).json({ error: 'No token provided' });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user and check role
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(403).json({ error: 'Access denied' });

    // Attach user to request object
    req.user = user;
    console.log(req.user)
    next();
  } catch (error) {
    console.error('Error in adminAuth middleware:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = adminAuth;
