import express from 'express'
import { createColumnController, createTaskController, getTaskDetailsController, taskBoardCreateController } from '../controller/task.controller.js'
import auth from "../middleware/auth.js"

const taskRoute = express()

taskRoute.post("/create-taskBoard",auth, taskBoardCreateController)
taskRoute.get("/task-deatails",auth , getTaskDetailsController)
taskRoute.put("/create-column",auth,createColumnController)
taskRoute.post("/task-create",auth,createTaskController)

export default taskRoute