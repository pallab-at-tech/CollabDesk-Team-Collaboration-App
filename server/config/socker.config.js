import express from 'express'
import { Server } from "socket.io";
import {createServer} from 'http'
import dotenv from 'dotenv'
dotenv.config()


const app = express()
const server = createServer(app)

const io = new Server(server , {
    cors : {
        credentials : true,
        origin : process.env.FRONTENT_URL
    }
})

io.on('connected' , (server) =>{
    console.log("User connected")
})

export {app , server}