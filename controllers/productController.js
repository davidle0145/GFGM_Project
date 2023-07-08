import HttpStatusCode from '../httpstatuscode/HttpStatusCode.js'
import { productRepository, userRepository } from '../repositories/indexRepository.js'

const MAX_RECORDS = 100
async function getAllProduct(req, res) {
    let {page = 1, size = MAX_RECORDS, searchString = ''} = req.query
    size = size >= MAX_RECORDS ? MAX_RECORDS : size  
    try {
        let filteredUsers = await productRepository.getAllProduct({
            size,
            page,
            searchString
        })
        res.status(HttpStatusCode.OK).json({
            message: 'Get product successfully',
            size: filteredUsers.length,
            page,
            searchString,
            data: { filteredUsers }
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        })
    }
}

async function getProductById(req, res) {
    let productId = req.params.id
    try {
        const product = await productRepository.getProductById(productId)
        res.status(HttpStatusCode.OK).json({
            message: 'Get detail product successfully',
            data: product
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        })
    }
}

async function insertProduct(req, res) {
    try {
        const product = await productRepository.insertProduct(req.body)
        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Insert product successfully',
            data: product
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert product: ' + exception,
            validationErrors: exception.validationErrors
        })
    }
}

async function updateProduct(req, res) {
    const {
        id,
        idUser,
        name,
        price,
        description,
    } = req.body
    try {
        const product = await productRepository.updateProduct(req.body)
        res.status(HttpStatusCode.OK).json({
            message: 'Update detail product successfully',
            data: product
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        })
    }
}

export default {
    getAllProduct,
    getProductById,
    insertProduct,
    updateProduct
}