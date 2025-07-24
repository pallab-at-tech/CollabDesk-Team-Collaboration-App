import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "user"
    },
    role : {
        type : String,
        enum : ["LEADER","CO-LEADER","MEMBER"],
        default : "MEMBER"
    }
})

const teamSchema  = new mongoose.Schema({
    name : {
        type :String,
        required : [true , "provide team-name"]
    },
    member : [
        memberSchema
    ]
},{
    timestamps : true
})

const teamModel = mongoose.model("team" , teamSchema)
export default teamModel