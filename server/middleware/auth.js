const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header or cookie
  const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key_optimal2024');
    req.admin = decoded.admin;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};
