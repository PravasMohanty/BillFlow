const express = require('express')
const { Register, getUserData, Login } = require('../controllers/authController')
const protect = require('../middlewares/auth')
const authRouter = express.Router()

authRouter.post('/register', Register)
authRouter.post('/login', Login )
authRouter.get('/me', protect, getUserData )

module.exports = authRouter