import express from 'express'

const router = express.Router()

router.get('/products', (req, res) => {
    res.send('GET all products')
})

router.get('/products/:id', (req, res) => {
    res.send('GET product by ID')
})

router.post('/products/insert', (req, res) => {
    res.send('INSERT product')
})

router.patch('/products/update', (req, res) => {
    res.send('UPDATE information products')
})

export default router