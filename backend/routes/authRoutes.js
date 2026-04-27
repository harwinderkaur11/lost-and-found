// routes/authRoutes.js
// ROUTER-LEVEL middleware — handles /api/auth/*
const express = require('express')
const router  = express.Router()
const jwt     = require('jsonwebtoken')
const User    = require('../models/User')
const { protect } = require('../middleware/auth')

// Helper — generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// POST /api/auth/signup
router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body  // body-parser already parsed this

    // Check duplicate email
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email already registered' })

    // Create user — password gets hashed by pre-save middleware in User model
    const user = await User.create({ name, email, password })

    res.status(201).json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      token: generateToken(user._id),   // JWT token for frontend
    })
  } catch (err) {
    next(err)   // pass to error handler middleware
  }
})

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid email or password' })

    // bcrypt compare via model method
    const match = await user.matchPassword(password)
    if (!match) return res.status(401).json({ message: 'Invalid email or password' })

    // Set session (express-session)
    req.session.userId = user._id
    req.session.userName = user.name

    res.json({
      _id:        user._id,
      name:       user.name,
      email:      user.email,
      profileImg: user.profileImg,
      token:      generateToken(user._id),
    })
  } catch (err) {
    next(err)
  }
})

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy()   // destroy express-session
  res.json({ message: 'Logged out successfully' })
})

// GET /api/auth/me  — get current logged-in user (protected)
router.get('/me', protect, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')
  res.json(user)
})

// PUT /api/auth/profile — update name, phone, profileImg
router.put('/profile', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    if (req.body.name)       user.name       = req.body.name
    if (req.body.phone)      user.phone      = req.body.phone
    if (req.body.profileImg) user.profileImg = req.body.profileImg
    await user.save()
    res.json({ name: user.name, email: user.email, phone: user.phone, profileImg: user.profileImg })
  } catch (err) {
    next(err)
  }
})

// PUT /api/auth/password — change password
router.put('/password', protect, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body
    const user = await User.findById(req.user._id)

    const match = await user.matchPassword(currentPassword)
    if (!match) return res.status(401).json({ message: 'Current password is incorrect' })

    user.password = newPassword  // pre-save hook will hash it
    await user.save()
    res.json({ message: 'Password updated successfully' })
  } catch (err) {
    next(err)
  }
})

module.exports = router
