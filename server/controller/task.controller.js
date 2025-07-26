import taskModel from "../model/task.model.js"

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

        const payload = {
            teamId,
            name,
        }

        const createTaskBoard = new taskModel(payload)
        const save = createTaskBoard.save()

        return response.json({
            message : 'Task create successfully',
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}