const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Check authentication
exports.authRequired = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Expect: "Bearer token"
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Role-based authorization
exports.authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Forbidden: Insufficient rights' });
    }
    next();
  };
};
