import express from 'express'

const router = express.Router()

router.post('/login', (req, res) => {
    res.send('Login account')
})

router.post('/register', (req, res) => {
    res.send('Register account')
})

export default router