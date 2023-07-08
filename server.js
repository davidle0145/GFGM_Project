import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { loginRouter, userRouter, productRouter } from './routes/indexRouter.js'
import connect from './database/database.js'
import checkToken from './authentication/auth.js'

const app = express()
app.use(checkToken)
app.use(express.json())
const port = process.env.PORT ?? 3000

// routers
app.use('/account', loginRouter)
app.use('/users', userRouter)
app.use('/products', productRouter)

app.get('/', (req, res) => {
    res.send('Hello my fen! 2023')
})

app.listen(port, async() => {
    await connect()
    console.log(`Server started at http://localhost:${port}`)
})