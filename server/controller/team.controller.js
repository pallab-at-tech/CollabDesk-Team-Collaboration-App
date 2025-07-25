import teamModel from "../model/team.model.js";
import userModel from "../model/user.model.js";

export const teamCreateController = async (request, response) => {
    try {
        const userId = request.userId

        const { name, role = "LEADER", description, organization_type } = request.body || {}

        if (!name) {
            return response.status(400).json({
                message: "Please provide team name",
                error: true,
                success: false
            })
        }

        if (!organization_type) {
            return response.status(400).json({
                message: "Please provide organization type",
                error: true,
                success: false
            })
        }

        const payload = {
            name,
            description,
            organization_type,
            member: [
                {
                    userId,
                    role
                }
            ]
        }

        const Team = new teamModel(payload)

        const save = await Team.save()


        const userDataUpdate = await userModel.findByIdAndUpdate(
            userId,
            {
                $push: {
                    roles: {
                        teamId: save._id,
                        role: role,
                        name : name,
                        organization_type : organization_type
                    }
                }
            }
        )

        return response.json({
            message: 'team create successfully',
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const addTeamMemberByLeaderController = async (request, response) => {
    try {

        const leaderId = request.userId
        const { userIdArray = [], teamId, role = "MEMBER" } = request.body || {}


        if (!teamId) {
            return response.status(400).json({
                message: 'team Id required',
                error: true,
                success: false
            })
        }

        if (!Array.isArray(userIdArray) || userIdArray.length === 0) {
            return response.status(400).json({
                message: 'provide userId',
                error: true,
                success: false
            })
        }

        const team = await teamModel.findById(teamId)

        if (!team) {
            return response.status(400).json({
                message: 'Team is not exist',
                error: true,
                success: false
            })
        }

        console.log("team", team)
        console.log("team member", team.member)

        const isTeamLeader = team.member.some((m) => m.userId.toString() === leaderId.toString() && m.role !== "MEMBER")
        console.log("leader id", leaderId)
        console.log("isTeamLeader", isTeamLeader)

        if (!isTeamLeader) {
            return response.status(400).json({
                message: "you haven't the access to add member",
                error: true,
                success: false
            })
        }

        console.log("all user array", userIdArray)

        const existingIds = team.member.map((m) => m.userId.toString())

        console.log("existingIds", existingIds)

        const newMember = userIdArray.filter(
            (userId) => userId && !existingIds.includes(userId.toString())
        )

        console.log("new momeber", newMember)

        if (newMember.length === 0) {
            return response.status(400).json({
                message: "users already exist in team",
                error: true,
                success: false
            })
        }

        newMember.forEach(
            (m) => {
                team.member.push({ userId: m, role: role })
            }
        )

        await team.save()

        const updatePromises = newMember.map(
            (userId) => {
                return userModel.findByIdAndUpdate(
                    userId,
                    {
                        $push: {
                            roles: {
                                teamId,
                                role: role
                            }
                        }
                    }
                )
            }
        )

        await Promise.all(updatePromises)

        return response.json({
            message: "members added in team",
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}