import { Schema, ObjectId } from "mongoose"
import mongoose from "mongoose"
import isEmail from 'validator/lib/isemail.js'

const User = mongoose.model('User',
    new Schema({
        id: {
            type: ObjectId
        },
        name: {
            type: String,
            required: true,
            validate: {
                validator: (name) => name.length >= 10,
                message: 'Name must be at least 10 characters'
            }
        },
        email: {
            type: String,
            validate: {
                validator: isEmail,
                message: 'Email is incorrect format'
            }
        },
        password: {
            // hashed/encrypted password
            type: String,
            required: true,
            validate: {
                validator: (password) => password.length >= 8,
                message: 'Password must be at least 8 characters'
            }
        },
        gender: {
            type: String,
            required: true,
            enum: {
                values: ['Male', 'Female', 'Other'],
                message: '{VALUE} is not supported'
            }
        },
        phoneNumber: {
            type: String,
            // required: true,
        },
        address: {
            type: String,
            //required: true,
        },
        role: {
            type: String,
            required: true
        },
    })
)

export default User