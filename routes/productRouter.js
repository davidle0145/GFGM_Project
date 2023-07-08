import express from 'express'
import { productController } from '../controllers/indexController.js'

const router = express.Router()

router.get('/', productController.getAllProduct)

router.get('/:id', productController.getProductById)

router.post('/insert', productController.insertProduct)

router.patch('/update', productController.updateProduct)

export default router