import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: false
        },
        lastName: {
            type: String,
            required: false
        },
        nickName: {
            type: String,
            required: true,
            unique: true
        },
        profileImg: {
            type: String,
            default: "../../../img/default-ProfileImg.png"
        },
        bio: {
            type: String,
            required: false
        },
        birthDate: {
            type: Date,
            required: true
        },
        age: {
            type: Number,
            required: false
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            Select: false
        },
        role: {
            type: String,
            enum: ["user", "admin", "superadmin"],
            default: "user"
        },
        isActive: {
            type: Boolean,
            default: false
        },
        followers: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        followed: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        chat: [{
            type: Schema.Types.ObjectId,
            ref: 'Chat'
        }],
        comment: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        posts: [{
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }],
        liked: [{
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }],
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const User = model('User', UserSchema)

export default User