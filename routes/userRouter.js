import express from 'express'

const router = express.Router()

router.get('/users', (req, res) => {
    res.send('GET all users')
})

router.get('/users/:id', (req, res) => {
    res.send('GET user by ID')
})

router.post('/users/insert', (req, res) => {
    res.send('INSERT user')
})

router.patch('/users/update', (req, res) => {
    res.send('UPDATE information users')
})

export default router