import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.ObjectId,
        ref : "user"
    },
    text : {
        type : String,
        default : ""
    },
    image : {
        type : String,
        default : ""
    },
    video : {
        type : String,
        default : ""
    },
    other_fileUrl_or_external_link : {
        type : Object,
        default : {}
    },
    readBy : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "user"
        }
    ]
},{
    timestamps : true
})


const conversationSchema = new mongoose.Schema({
    group_type : {
        type : String,
        enum : ["PRIVATE" , "GROUP"],
        required : [true , "give private or group chat"]
    },
    participants : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "user"
        }
    ],
    messages : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "message"
        }
    ]
},{
    timestamps : true
})

const messageModel = mongoose.model("message" , messageSchema)
const conversationModel = mongoose.model("conversation" , conversationSchema)

export {messageModel , conversationModel}