import mongoose, { Schema, model } from "mongoose";

const commentSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        postTarget: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
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

export const Comment = model('Comment', commentSchema)

export default Comment