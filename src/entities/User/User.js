import { Schema, model } from "mongoose";

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
            require: false
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            Selection: false
        },
        role: {
            type: String,
            enum: ["user", "admin", "superAdmin"],
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
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        chat: [{
            type: Schema.Types.ObjectId,
            ref: 'Chat'
        }],
        posts: [{
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }],
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const User = model('User', UserSchema)

export default User