import mongoose, { Schema, model } from "mongoose";

const commentSchema = new Schema({

    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    message: {
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    },
},
    {
        timestamps: true,
        versionKey: false
    }
)

const Comment = model('Comment', commentSchema)

export default Comment