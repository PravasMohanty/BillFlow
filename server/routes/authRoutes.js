const express = require('express')
const { register, getUserData, login } = require('../controllers/authController')
const protect = require('../middlewares/auth')
const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/me', protect, getUserData)

module.exports = authRouter