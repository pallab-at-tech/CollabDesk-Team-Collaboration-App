import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    assignby: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    assignTo: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "user"
        }
    ],
    status: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    video: {
        type: String,
        default: ""
    },
    aditional_link: [
        {
            type: Object,
            default: {}
        }
    ],
    dueDate: {
        type: String,
        default: ""
    },
    dueTime: {
        type: String,
        default: ""
    },
    labels: [
        {
            type: String,
            default: ""
        }
    ]
})


const columnSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tasks: [taskSchema]
})

const taskBoardSchema = new mongoose.Schema({
    teamId: {
        type: mongoose.Schema.ObjectId,
        ref: "team"
    },
    name: {
        type: String,
        required: true
    },
    column: [
        columnSchema
    ],

}, {
    timestamps: true
})

const taskModel = mongoose.model("taskboard", taskBoardSchema)
export default taskModel