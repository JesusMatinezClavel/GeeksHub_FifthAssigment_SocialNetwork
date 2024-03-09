import { Schema, model } from "mongoose";
import { userAge } from "../utils/userAge.js";


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
            enum: ["user", "admin", "super_admin"],
            default: "user"
        },
        isActive: {
            type:Boolean,
            default: false
        },
        followers: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        followed: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const User = model('User', UserSchema)

export default User