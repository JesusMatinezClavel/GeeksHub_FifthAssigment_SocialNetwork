import mongoose, { Schema, model } from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        media: {
            type: String,
            required: false
        },
        hashtag: {
            type: String,
            required: false
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const Post = model('Post', postSchema)

export default Post