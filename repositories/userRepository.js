import Exception from '../exceptions/Exception.js'
import { User } from '../models/index.js'

const getAllUser = async ({
    page,
    size,
    searchString
}) => {
    // aggregate data for all users
    page = parseInt(page)
    size = parseInt(size)
    let filteredUsers = await User.aggregate([
        { $match: 
            { $or: [
                { name: {$regex: `.*${searchString}.*`, $options: 'i'}}, // i: ignore case
                { email: {$regex: `.*${searchString}.*`, $options: 'i'}},
                { phoneNumber: {$regex: `.*${searchString}.*`, $options: 'i'}},
                { address: {$regex: `.*${searchString}.*`, $options: 'i'}}
            ]}
        },
        { $skip: (page - 1) * size },
        { $limit: size },
    ])
    return filteredUsers
}

const getUserById = async(userId) => {
    const user = await User.findById(userId)
    if (!user) {
        throw new Exception(Exception.CANNOT_FIND_USER_BY_ID + userId)
    }
    return user
}

const insertUser = async ({
    name,
    email,
    password,
    gender,
    phoneNumber,
    address,
    role
}) => {
    try {
        const user = await User.create({
            name,
            email,
            password,
            gender,
            phoneNumber,
            address,
            role
        })
        return user
    } catch (exception) {
        if (!!exception.errors) {
            throw new Exception('Input error',exception.errors)
        }
    }
}

const updateUser = async ({
    id,
    name,
    email,
    password,
    gender,
    phoneNumber,
    address,
    role
}) => {
    const user = await User.findById(id)
    user.name = name ?? user.name
    user.email = email ?? user.email
    user.password = password ?? user.password
    user.gender = gender ?? user.gender
    user.phoneNumber = phoneNumber ?? user.phoneNumber
    user.address = address ?? user.address
    user.role = role ?? user.role
    await user.save()
    return user
}

export default {
    getAllUser,
    getUserById,
    insertUser,
    updateUser
}