import Exception from '../exceptions/Exception.js'
import { Product } from '../models/index.js'

const getAllProduct = async ({
    page,
    size,
    searchString
}) => {
    // aggregate data for all users
    page = parseInt(page)
    size = parseInt(size)
    let filteredProducts = await Product.aggregate([
        { $match: 
            { $or: [
                { name: {$regex: `.*${searchString}.*`, $options: 'i'}}, // i: ignore case
                { price: {$regex: `.*${searchString}.*`, $options: 'i'}},
                { description: {$regex: `.*${searchString}.*`, $options: 'i'}}
            ]}
        },
        { $skip: (page - 1) * size },
        { $limit: size },
    ])
    return filteredProducts
}

const getProductById = async(productId) => {
    const product = await Product.findById(productId)
    if (!product) {
        throw new Exception(Exception.CANNOT_FIND_PRODUCT_BY_ID + productId)
    }
    return product
}

const insertProduct = async ({
    idUser,
    name,
    price,
    description
}) => {
    try {
        const product = await Product.create({
            idUser,
            name,
            price,
            description
        })
        return product
    } catch (exception) {
        if (!!exception.errors) {
            throw new Exception('Input error',exception.errors)
        }
    }
}

const updateProduct = async ({
    id,
    idUser,
    name,
    price,
    description
}) => {
    const product = await Product.findById(id)
    product.idUser = idUser ?? product.idUser
    product.name = name ?? product.name
    product.price = price ?? product.price
    product.description = description ?? product.description
    await product.save()
    return product
}

export default {
    getAllProduct,
    getProductById,
    insertProduct,
    updateProduct
}
