import mongoose, { Schema, model } from "mongoose";

const chatSchema = new Schema({

    message: {
        type: String,
        required: true
    },
    message: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
},
    {
        timestamps: true,
        versionKey: false
    }
)

const Chat = model('Chat', chatSchema)

export default Chat