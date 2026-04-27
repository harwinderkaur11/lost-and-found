// models/User.js
// Mongoose Schema — defines the shape of user documents in MongoDB
const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true, minlength: 8 },
  phone:     { type: String, default: '' },
  profileImg:{ type: String, default: '' },   // base64 or URL
  createdAt: { type: Date,   default: Date.now },
})

// Middleware — runs BEFORE saving: hash password automatically
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()  // only hash if changed
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// Instance method — compare entered password with hashed one
userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password)
}

module.exports = mongoose.model('User', userSchema)
