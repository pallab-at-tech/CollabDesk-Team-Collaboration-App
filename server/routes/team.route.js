import express from 'express'
import { teamCreateController , addTeamMemberByLeaderController, getTeamDetailsController } from '../controller/team.controller.js'
import auth from '../middleware/auth.js'

const teamRouter = express()

teamRouter.post("/team-create",auth, teamCreateController)
teamRouter.post("/add-members",auth , addTeamMemberByLeaderController)
teamRouter.get("/team-details",auth, getTeamDetailsController)

export default teamRouter