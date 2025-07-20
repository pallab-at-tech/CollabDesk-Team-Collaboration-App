import mongoose from 'mongoose'


const RoleSchema = new mongoose.Schema({
    teamId: {
        type: mongoose.Schema.ObjectId,
        ref: "team"
    },
    role: {
        type: String,
        enum: ["ADMIN", "MEMBER"],
        required: true
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "provided name"]
    },
    email: {
        type: String,
        required: [true, "provided email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "provided password"]
    },
    roles: [
        RoleSchema
    ],
    avatar: {
        type: String,
        default: ""
    },
    verify_code : {
        type : String,
        default : ""
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    refresh_token: {
        type: String,
        default: ""
    },
    forgot_Password_otp: {
        type: String,
        default: ""
    },
    forgot_Password_expiry: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})

const userModel = mongoose.model("user", userSchema)
export default userModel