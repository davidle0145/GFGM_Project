import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import loginRouter from './routes/loginRouter.js'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'


const app = express()

app.use(express.json())
const post = process.env.POST ?? 3000

// routers
app.use('/login', loginRouter)
app.use('/users', userRouter)
app.use('/products', productRouter)

app.get('/', (req, res) => {
    res.send('Hello my fen! 2023')
})

app.listen(post, async() => {
    console.log(`Server started at http://localhost:${post}`)
})