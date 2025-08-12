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

    // join in a room and online
    socket.on("join_room", (userId) => {

        socket.join(userId.toString())
        onlineUser.set(socket.id, userId.toString());

        io.emit("online_user", Array.from(new Set(onlineUser.values())))

        console.log("User connected:", socket.id);
    })


    //get all message info
    socket.on("all_message_info", async (userId) => {
        try {

            const conversation = await conversationModel.find({
                participants: userId,
            }).lean()

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

            socket.emit("get_message_info",users)

            console.log("user details for message",users)

        } catch (error) {
            console.log("error for get message", error)
        }
    })


    // message to new member
    socket.on("messageTo_new_member", async (data) => {

        const { receiverId, senderId } = data

        let conversation = await conversationModel.findOne({
            group_type: "PRIVATE",
            participants: { $all: [senderId, receiverId], $size: 2 }
        })

        if (!conversation) {
            conversation = await conversationModel.create({
                group_type: "PRIVATE",
                participants: [senderId, receiverId],
                messages: []
            })
        }

        await conversation.save()
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

        console.log("User disconnected:", socket.id);

    });
})

export { app, server }