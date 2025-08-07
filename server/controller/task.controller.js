import taskModel from "../model/task.model.js"
import userModel from "../model/user.model.js"

export const taskBoardCreateController = async (request, response) => {
    try {

        const { teamId, name } = request.body || {}

        if (!name) {
            return response.status(400).json({
                message: 'Task tittle required',
                error: true,
                success: false
            })
        }

        if (!teamId) {
            return response.status(400).json({
                message: 'Team Id required',
                error: true,
                success: false
            })
        }

        const isAlreadyTaskBoardExist = await taskModel.findOne({ teamId: teamId })

        if (isAlreadyTaskBoardExist) {
            return response.status(400).json({
                message: 'task already exist',
                error: true,
                success: false
            })
        }

        const payload = {
            teamId,
            name,
        }

        const createTaskBoard = new taskModel(payload)
        const save = createTaskBoard.save()

        return response.json({
            message: 'Task board create successfully',
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

export const getTaskDetailsController = async (request, response) => {
    try {
        const { teamId } = request.query || {}

        if (!teamId) {
            return response.status(400).json({
                message: 'team ID required',
                error: true,
                success: false
            })
        }

        const data = await taskModel.findOne({ teamId: teamId })

        return response.json({
            message: 'get task details',
            data: data,
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

export const createColumnController = async (request, response) => {
    try {

        const { teamId, name } = request.body || {}
        const userId = request.userId

        if (!teamId) {
            return response.status(400).json({
                message: 'team ID required',
                error: true,
                success: false
            })
        }

        if (!name) {
            return response.status(400).json({
                message: 'name required',
                error: true,
                success: false
            })
        }

        const user = await userModel.findById(userId)

        const isPermission = true

        {
            user.roles.map((elem) => {
                if (elem.teamId === teamId && elem.role !== "LEADER") {
                    isPermission = false
                }
            })
        }

        if (!isPermission) {
            return response.status(400).json({
                message: 'Permission denied',
                error: true,
                success: false
            })
        }

        const payload = {
            name: name,
            tasks: []
        }

        const upadateColumn = await taskModel.findOneAndUpdate({ teamId: teamId },
            {
                $push: {
                    column: payload
                }
            }
        )

        return response.json({
            message: 'New column created',
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

export const createTaskController = async (request, response) => {
    try {

        const userId = request.userId

        const { teamId, columnId, title, description, assignTo, status, aditional_link, dueDate, dueTime, labels, image, video } = request.body || {}

        if (!title) {
            return response.status(400).json({
                message: 'please provide title',
                error: true,
                success: false
            })
        }

        if (!dueDate) {
            return response.status(400).json({
                message: 'please provide deathLine',
                error: true,
                success: false
            })
        }

        const user = await userModel.findById(userId)

        if (!user) {
            return response.status(404).json({
                message: 'User not found',
                error: true,
                success: false
            });
        }

        const taskBoard = await taskModel.findOne({ teamId: teamId })

        if (!taskBoard) {
            return response.status(404).json({
                message: 'Task board not found for team',
                error: true,
                success: false
            });
        }

        let hasPermission = false;

        user.roles.forEach((role) => {
            if (role.teamId.toString() === teamId && role.role !== "MEMBER") {
                hasPermission = true;
            }
        });


        if (!hasPermission) {
            return response.status(400).json({
                message: 'Permission denied',
                error: true,
                success: false
            })
        }


        const column = taskBoard.column.id(columnId)

        if (!column) {
            return response.status(404).json({
                message: 'column not found for task Board',
                error: true,
                success: false
            });
        }

        const payload = {
            title,
            description,
            assignby: userId,
            assignTo: assignTo,
            status,
            aditional_link,
            dueDate,
            dueTime,
            labels,
            image,
            video,
        }

        column.tasks.push(payload)

        await taskBoard.save()

        return response.json({
            message: 'Task created successfully',
            success: true,
            error: false
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
} 