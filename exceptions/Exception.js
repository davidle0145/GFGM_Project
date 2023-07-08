export default class Exception extends Error {
    static WRONG_EMAIL_PASSWORD = "Wrong Email or Password"
    static WRONG_CONNECTION_STRING = "Wrong server name/connection string"
    static CANNOT_CONNECT_MONGODB = "Cannot connect to Mongoose"
    static USER_EXISTS = "User already exists in DB"
    static CANNOT_REGISTER_USER = "Cannot register user"
    static CANNOT_FIND_USER_BY_ID = "Cannot find User by ID: "
    static CANNOT_FIND_PRODUCT_BY_ID = "Cannot find User by ID: "

    constructor(message, validationErrors={}) {
        super(message)
        this.validationErrors = validationErrors
        console.log(message)
    }
}