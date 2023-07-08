import express from 'express'
import { userController } from '../controllers/indexController.js'

const router = express.Router()

router.get('/', userController.getAllUser)

router.get('/:id', userController.getUserById)

router.post('/insert', userController.insertUser)

router.patch('/update', userController.updateUser)

export default router