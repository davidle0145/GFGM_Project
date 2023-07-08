import { validationResult } from 'express-validator'
import { loginRepository } from '../repositories/indexRepository.js'
import { EventEmitter } from 'node:events'
import HttpStatusCode from '../httpstatuscode/HttpStatusCode.js'

const myEvent = new EventEmitter()
// listen
myEvent.on('event.register.user', (params) => {
    console.log(`They talked about: ${JSON.stringify(params)}`)
})

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ 
            errors: errors.array() 
        });
    }
    const {email, password} = req.body
    // call repository
    try {
        let existingUser = await loginRepository.login({email, password})
        res.status(HttpStatusCode.OK).json({
            message: 'Login user successfully',
            data: existingUser // detail user
        })
    } catch(exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }

}

const register = async (req, res) => {
    // destructuring
    const {
        name,
        email, 
        password,
        gender,
        phoneNumber,
        address,
        role
    } = req.body
    // Event Emitter
    myEvent.emit('event.register.user', {email, phoneNumber})
    try {
        const user = await loginRepository.register({
            name,
            email,
            password,
            gender,
            phoneNumber,
            address,
            role
        })
        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Register user successfully',
            data: user
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
}

export default {
    login,
    register
}
