import mongoose, { Schema, model } from "mongoose";

const commentSchema = new Schema({

    sender: {
        type: String,
        required: true
    },
    postTarget: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
},
    {
        timestamps: true,
        versionKey: false
    }
)

const Comment = model('Comment', commentSchema)

export default Comment