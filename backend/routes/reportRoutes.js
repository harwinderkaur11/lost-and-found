// routes/reportRoutes.js
// ROUTER-LEVEL middleware — handles /api/reports/*
const express = require('express')
const router  = express.Router()
const Report  = require('../models/Report')
const { protect } = require('../middleware/auth')

// GET /api/reports — get all reports (public, no auth needed)
router.get('/', async (req, res, next) => {
  try {
    // populate('user', 'name email') replaces user ID with actual user data
    const reports = await Report.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })   // newest first
    res.json(reports)
  } catch (err) {
    next(err)
  }
})

// GET /api/reports/mine — get only current user's reports (protected)
router.get('/mine', protect, async (req, res, next) => {
  try {
    const reports = await Report.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(reports)
  } catch (err) {
    next(err)
  }
})

// POST /api/reports — create new report (protected)
router.post('/', protect, async (req, res, next) => {
  try {
    const { title, location, category, desc, date, type, img } = req.body
    const report = await Report.create({
      title, location, category, desc, date, type, img,
      user:     req.user._id,
      userName: req.user.name,
    })
    res.status(201).json(report)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/reports/:id — delete a report (only owner can delete)
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id)
    if (!report) return res.status(404).json({ message: 'Report not found' })

    // Authorization check — only the owner can delete
    if (report.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this report' })
    }

    await report.deleteOne()
    res.json({ message: 'Report deleted' })
  } catch (err) {
    next(err)
  }
})

module.exports = router
