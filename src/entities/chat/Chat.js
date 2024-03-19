import mongoose, { Schema, model } from "mongoose";

const chatSchema = new Schema({

    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
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

const Chat = model('Chat', chatSchema)

export default Chat