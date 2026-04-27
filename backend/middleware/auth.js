// middleware/auth.js
// This is APPLICATION-LEVEL middleware — protects private routes
const jwt  = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  let token

  // JWT sent in Authorization header as: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      // Verify token with secret — throws if invalid/expired
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Attach user to request (minus password) — available in all next handlers
      req.user = await User.findById(decoded.id).select('-password')

      next()   // move to next middleware or route handler
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' })
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' })
  }
}

module.exports = { protect }
