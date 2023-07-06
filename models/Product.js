import { Schema, ObjectId } from 'mongoose'
import mongoose from 'mongoose'

const Product =  mongoose.model('Product',
    new Schema({
        id: {
            type: ObjectId
        },
        idUser: {
            type: ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true,
            validate: {
                validator: (name) => name.length > 1,
                message: 'Name must be at least 1 characters'
            }
        },
        price: {
            type: Number,
            required: true,
            validate: {
                validator: (price) => price > 0,
                message: 'Price must be a positive number'
            }
        },
        description: {
            type: String,
            required: true,
            validate: {
                message: 'Please enter product description'
            }
        },
    })
)

export default Product