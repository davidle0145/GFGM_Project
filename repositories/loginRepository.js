import { User } from '../models/index.js'
import Exception from '../exceptions/Exception.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async ({
    email,
    password
}) => {
    let existingUser = await User.findOne({email}).exec()
    if (existingUser) {
        // not encrypt password
        let isMatch = await bcrypt.compare(password, existingUser.password)
        if (!!isMatch) {
            // create JWT
            let token = jwt.sign (
                { data: existingUser }, 
                process.env.JWT_SECRET,
                { expiresIn: '10 days' }
            )
            // clone an add more properties
            return {
                ...existingUser.toObject(),
                password: "Not Show Password",
                token: token
            }
        } else {
            throw new Exception(Exception.WRONG_EMAIL_PASSWORD)
        }
    } else {
        throw new Exception(Exception.WRONG_EMAIL_PASSWORD)
    }
}

const register = async ({
    name,
    email, 
    password,
    gender,
    phoneNumber,
    address,
    role
}) => {
    const existingUser = await User.findOne({email}).exec()
    if (!!existingUser) {
        throw new Exception(Exception.USER_EXISTS)
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
    // insert to db
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        gender,
        phoneNumber,
        address,
        role
    })
    return {
        ...newUser._doc,
        password: 'Not Show Password'
    }
}

export default {
    login,
    register
}