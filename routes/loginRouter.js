import express from 'express'
import { body } from 'express-validator'
import { loginController } from '../controllers/indexController.js'

const router = express.Router()

router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    loginController.login
)

router.post('/register', loginController.register)

export default router