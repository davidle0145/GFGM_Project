import HttpStatusCode from '../httpstatuscode/HttpStatusCode.js'
import { userRepository } from '../repositories/indexRepository.js'

const MAX_RECORDS = 100
async function getAllUser(req, res) {
    let {page = 1, size = MAX_RECORDS, searchString = ''} = req.query
    size = size >= MAX_RECORDS ? MAX_RECORDS : size  
    try {
        let filteredUsers = await userRepository.getAllUser({
            size,
            page,
            searchString
        })
        res.status(HttpStatusCode.OK).json({
            message: 'Get users successfully',
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

async function getUserById(req, res) {
    let userId = req.params.id
    try {
        const user = await userRepository.getUserById(userId)
        res.status(HttpStatusCode.OK).json({
            message: 'Get detail user successfully',
            data: user
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        })
    }
}

async function insertUser(req, res) {
    try {
        const user = await userRepository.insertUser(req.body)
        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Insert user successfully',
            data: user
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert user: ' + exception,
            validationErrors: exception.validationErrors
        })
    }
}

async function updateUser(req, res) {
    const {
        id,
        name,
        email,
        languages,
        gender,
        phoneNumber,
        address
    } = req.body
    try {
        const user = await userRepository.updateUser(req.body)
        res.status(HttpStatusCode.OK).json({
            message: 'Update detail user successfully',
            data: user
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        })
    }
}

export default {
    getAllUser,
    getUserById,
    insertUser,
    updateUser
}