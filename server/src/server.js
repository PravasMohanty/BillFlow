const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('../config/db')
const expenseRouter = require('../routes/expenseRoutes')
const authRouter = require('../routes/authRoutes')

dotenv.config()
const app = express()

// Connect to MongoDB
connectDB()

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}

// Apply CORS middleware
app.use(cors(corsOptions))

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended : true}))

// Routes
app.use('/api/auth', authRouter )
app.use('/api/expenses', expenseRouter )

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)})