import express from 'express'
import {
    registerUser,
    loginUser,
    getProfile
} from '../controllers/authController.js'
import protect from '../middleware/authMiddleware.js'

const authRouter = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.get('/profile', protect, getProfile)

export default authRouter