import express from 'express'
import auth from '../middleware/auth.js'
import { getPreviousChatUsers } from '../controller/chat.controller.js'

const chatRoute = express()

chatRoute.get("/get-all-participants-details",auth,getPreviousChatUsers)

export default chatRoute