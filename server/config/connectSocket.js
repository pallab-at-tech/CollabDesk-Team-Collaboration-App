import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { conversationModel, messageModel } from '../model/chat.model.js'
import userModel from '../model/user.model.js'
dotenv.config()



const app = express()
const server = createServer(app)

const io = new Server(server, {
    cors: {
        credentials: true,
        origin: process.env.FRONTENT_URL
    }
})


const onlineUser = new Map()

io.on("connection", async (socket) => {

    // socket.emit("receive_message", { message: { text: "Test message from server" } });

    // join in a room and online
    socket.on("join_room", (userId) => {

        socket.join(userId.toString())
        onlineUser.set(socket.id, userId.toString());

        io.emit("online_user", Array.from(new Set(onlineUser.values())))

        console.log("User connected:", `${socket.id} -- ${userId}`);
    })

    // send message
    socket.on("send_message", async (data) => {
        try {
            const { senderId, receiverId, text, image, video, other_fileUrl_or_external_link } = data;


            let conversation = await conversationModel.findOne({
                group_type: "PRIVATE",
                participants: { $all: [senderId, receiverId], $size: 2 }
            });

            if (!conversation) {
                conversation = await conversationModel.create({
                    group_type: "PRIVATE",
                    participants: [senderId, receiverId],
                    messages: []
                })
            }

            const newMessage = await messageModel.create({
                senderId: senderId,
                recieverId: receiverId,
                text: text,
                image: image,
                video: video,
                other_fileUrl_or_external_link: other_fileUrl_or_external_link,
                readBy: [senderId]
            })

            conversation.messages.push(newMessage._id)
            await conversation.save()


            const otherUserId = conversation.participants.find(
                (pId) => pId.toString() !== senderId.toString()
            )

            const otherUser = await userModel.findById(otherUserId)
                .select("_id name avatar email userId")
                .lean();

            const conversationToEmit = {
                _id: conversation._id,
                group_type: conversation.group_type,
                participants: conversation.participants,
                messages: conversation.messages,
                otherUser
            };

            const populatedMessage = await messageModel.findById(newMessage._id)
                .populate("senderId", "_id name avatar userId")
                .lean();

                
            io.to(senderId.toString()).emit("receive_message", {
                conversation: conversationToEmit,
                message: populatedMessage,
            });

            io.to(receiverId.toString()).emit("receive_message", {
                conversation: conversationToEmit,
                message: populatedMessage,
            });


        } catch (error) {
            console.error("Error sending message:", error);
        }
    })


    // disconnect from the room and offline
    socket.on("disconnect", () => {
        const userId = onlineUser.get(socket.id)

        if (userId) {
            onlineUser.delete(socket.id)
            io.emit("online_user", Array.from(new Set(onlineUser.values())))
        }

        console.log("User connected:", `${socket.id} -- ${userId}`);

    });
})

export { app, server }