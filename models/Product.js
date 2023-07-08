import { Schema, ObjectId } from "mongoose"
import mongoose from "mongoose"

const Product =  mongoose.model('Product',
    new Schema({
        id: {
            type: ObjectId
        },
        idUser: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            validate: {
                validator: (name) => name.length >= 2,
                message: 'Name must be at least 2 characters'
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
                validator: (description) => description.length > 0,
                message: 'Please enter product description'
            }
        },
    })
)

export default Product