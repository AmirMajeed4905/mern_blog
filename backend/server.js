// ----------------------
// IMPORTS
// ----------------------
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import errorHandler from './utils/errorHandler.js'

import connectDB from './config/db.js'
// import routes here when ready
import AuthRoute from './routes/user.routes.js'
// import UserRoute from './routes/User.route.js'
// import CategoryRoute from './routes/Category.route.js'
// import BlogRoute from './routes/Blog.route.js'
// import CommentRoute from './routes/Comment.route.js'
// import BlogLikeRoute from './routes/Bloglike.route.js'

// ----------------------
// CONFIGURATION
// ----------------------
dotenv.config()
connectDB()

const PORT = process.env.PORT || 5000
const app = express()

// ----------------------
// SECURITY MIDDLEWARES
// ----------------------
app.use(helmet())              // Secure HTTP headers
app.use(compression())         // Gzip compression
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 min
  max: 10, // max requests per IP
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false,    // Disable `X-RateLimit-*` headers
});
app.use(limiter)

// ----------------------
// OTHER MIDDLEWARES
// ----------------------
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ----------------------
// ROUTES
// ----------------------
app.use('/api/auth', AuthRoute)
// app.use('/api/user', UserRoute)
// app.use('/api/category', CategoryRoute)
// app.use('/api/blog', BlogRoute)
// app.use('/api/comment', CommentRoute)
// app.use('/api/blog-like', BlogLikeRoute)

app.get('/', (req, res) => {
  res.send('API running')
})

// ----------------------
// ERROR HANDLER
// ----------------------
app.use(errorHandler);
// ----------------------
// START SERVER
// ----------------------
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
