import express from 'express'
import { createColumnController, getTaskDetailsController, taskBoardCreateController } from '../controller/task.controller.js'
import auth from "../middleware/auth.js"

const taskRoute = express()

taskRoute.post("/create-taskBoard",auth, taskBoardCreateController)
taskRoute.get("/task-deatails",auth , getTaskDetailsController)
taskRoute.put("/create-column",auth,createColumnController)

export default taskRoute