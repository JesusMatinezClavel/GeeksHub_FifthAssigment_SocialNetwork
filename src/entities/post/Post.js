import { Schema, model } from "mongoose";

const postSchema = new Schema({

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
},
    {
        timestamps: true,
        versionKey: false
    }
)

const Post = model('User', postSchema)

export default Post