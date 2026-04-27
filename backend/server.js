// server.js — Main Express server
require('dotenv').config()   // load .env variables first

const express      = require('express')
const cors         = require('cors')
const morgan       = require('morgan')        // third-party middleware — HTTP request logger
const cookieParser = require('cookie-parser') // third-party middleware — parse cookies
const session      = require('express-session')
const http         = require('http')
const { Server }   = require('socket.io')
const connectDB    = require('./config/db')
const errorHandler = require('./middleware/errorHandler')

// ── Connect to MongoDB ──────────────────────────────────────
connectDB()

const app    = express()
const server = http.createServer(app)   // needed for socket.io

// ── Socket.io — Full Duplex / Real-time communication ──────
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL, methods: ['GET', 'POST'] }
})

io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id)

  // When a new report is submitted, broadcast to ALL connected clients
  socket.on('new_report', (report) => {
    io.emit('report_added', report)   // everyone gets it in real-time
  })

  socket.on('disconnect', () => {
    console.log('🔌 User disconnected:', socket.id)
  })
})

// Make io accessible in routes via req.io
app.use((req, res, next) => { req.io = io; next() })

// ══════════════════════════════════════════════════════
// APPLICATION-LEVEL MIDDLEWARE
// These run on EVERY request, in order, top to bottom
// Request travels: client → cors → morgan → json → session → cookieParser → routes → errorHandler
// ══════════════════════════════════════════════════════

// 1. CORS — allow frontend (localhost:5173) to talk to backend (localhost:5000)
app.use(cors({
  origin:      process.env.CLIENT_URL,
  credentials: true,   // allow cookies to be sent cross-origin
}))

// 2. morgan — THIRD-PARTY middleware — logs every request: GET /api/auth/login 200 45ms
app.use(morgan('dev'))

// 3. express.json() — BODY PARSER — parses incoming JSON request body
//    Without this, req.body would be undefined
//    NON-BLOCKING — async, doesn't freeze the server while reading body
app.use(express.json({ limit: '10mb' }))   // 10mb to allow base64 images

// 4. express.urlencoded() — parses form data (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }))

// 5. cookie-parser — THIRD-PARTY middleware — parses Cookie header → req.cookies
app.use(cookieParser())

// 6. express-session — SESSION MANAGEMENT
//    Server stores session data, sends session ID in a cookie to client
app.use(session({
  secret:            process.env.SESSION_SECRET,
  resave:            false,   // don't save session if unmodified
  saveUninitialized: false,   // don't create session until something stored
  cookie: {
    maxAge:   7 * 24 * 60 * 60 * 1000,   // 7 days in ms
    httpOnly: true,    // JS can't access cookie — prevents XSS
    secure:   false,   // set true in production with HTTPS
  }
}))

// ── Health check route ──────────────────────────────────────
app.get('/', (req, res) => res.json({ message: '🔍 Lost & Found API running!' }))

// ── ROUTER-LEVEL MIDDLEWARE ─────────────────────────────────
// Each router handles its own group of routes
app.use('/api/auth',    require('./routes/authRoutes'))
app.use('/api/reports', require('./routes/reportRoutes'))

// ── 404 handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` })
})

// ── ERROR-HANDLING middleware — must be LAST ─────────────────
// Has 4 params: (err, req, res, next) — Express identifies it as error handler
app.use(errorHandler)

// ── Start server ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
