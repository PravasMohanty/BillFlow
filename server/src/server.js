const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('../config/db')
const expenseRouter = require('../routes/expenseRoutes')
const authRouter = require('../routes/authRoutes')

dotenv.config()
const app = express()

// Connect to MongoDB
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/api/auth', authRouter )
app.use('/api/expenses', expenseRouter )

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)})