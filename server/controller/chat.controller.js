import { conversationModel } from "../model/chat.model.js"
import userModel from "../model/user.model.js"

export const getPreviousChatUsers = async (request, response) => {
    try {
        const userId = request.userId

        const conversation = await conversationModel.find({
            participants: userId
        }).lean()

        if (Array.isArray(conversation) && conversation.length === 0) {
            return response.status(400).json({
                message: 'No conversation Available',
                error: true,
                success: false
            })
        }

        const otherUserId = new Set()

        conversation.forEach(data => {
            data.forEach(d => {
                if (d.toString() !== userId.toString()) {
                    otherUserId.add(d.toString())
                }
            })
        })

        const users = await userModel.find({
            _id: { $in: Array.from(otherUserId) }
        }).select("_id name avatar email")

        return response.json({
            message: 'Get all participants details',
            data: users,
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}