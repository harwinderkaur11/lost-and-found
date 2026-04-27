// models/Report.js
const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, default: '' },
  desc:     { type: String, required: true },
  date:     { type: String, required: true },
  type:     { type: String, enum: ['lost', 'found'], required: true },
  img:      { type: String, default: '' },   // base64 image
  // Reference to User — links report to who submitted it
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String },
}, { timestamps: true })   // adds createdAt + updatedAt automatically

module.exports = mongoose.model('Report', reportSchema)
