const express = require('express')
const { Register, getUserData, Login } = require('../controllers/authController')
const authRouter = express.Router()

authRouter.post('/auth/register', Register)
authRouter.post('/auth/login', Login )
authRouter.post('/me' , getUserData )