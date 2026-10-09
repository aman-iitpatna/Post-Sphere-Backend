import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cors from "cors"
import connectDB from './Src/db/index.js'
const app = express()
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 8000

const ALLOW_ORIGIN = process.env.allow_origin

connectDB()
.then(() => {
    app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})
}).catch((err) => {
    console.log("Error connecting to database", err);
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors(
    {
        origin: [
            "http://localhost:5173",
            ALLOW_ORIGIN,
            "*",
        ]
    }
))

import userRouter from './Src/routes/user.routes.js'
import postRouter from './Src/routes/posts.routes.js'

app.get('/', (req, res) => {
    res.send('Welcome to the Post Sphere API');
})
app.use('/user', userRouter);
app.use('/post', postRouter);