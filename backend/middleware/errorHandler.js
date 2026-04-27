// middleware/errorHandler.js
// ERROR-HANDLING middleware — must have exactly 4 params (err, req, res, next)
// Express knows it's an error handler because of the 4th param
const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message)

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode

  res.status(statusCode).json({
    message: err.message,
    // show stack trace only in development
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = errorHandler
