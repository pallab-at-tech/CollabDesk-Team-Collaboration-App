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

        const otherUserIds = [];

        conversation.forEach(conv => {
            conv.participants.forEach(pId => {
                if (pId.toString() !== userId.toString()) {
                    otherUserIds.push(pId.toString());
                }
            });
        });

        const users = await userModel.find({
            _id: { $in: otherUserIds }
        }).select("_id name avatar email userId").lean()

        const mergedData = conversation.map(conv => {
            const otherId = conv.participants.find(pId => pId.toString() !== userId.toString());
            const otherUser = users.find(u => u._id.toString() === otherId.toString());

            return {
                ...conv,
                otherUser 
            };
        });

        return response.json({
            message: 'Get all participants details',
            data: mergedData,
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