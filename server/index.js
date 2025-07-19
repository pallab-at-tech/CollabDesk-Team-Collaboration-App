import express, { response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import dotenv from 'dotenv'
dotenv.config()


import { app, server } from './config/socker.config.js'


app.use(cors({
    credentials: true,
    origin: process.env.FRONTENT_URL
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(helmet({
    crossOriginResourcePolicy: false
}))


app.get("/", (request, response) => {
    return response.json({
        message: 'Server is about to start...'
    })
})

const PORT = 8080 || process.env.PORT

server.listen(PORT, () => {
    console.log(`Server starting at http://localhost:${PORT}`)
})