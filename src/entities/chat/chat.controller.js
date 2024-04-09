import { catchStatus, tryStatus } from "../../utils/resStatus.js";
import User from "../user/User.js";
import Chat from "./Chat.js";

export const getOwnChats = async (req, res) => {
    try {

        const userId = req.tokenData.userID

        const userChats = await Chat.find({
            sender: userId
        })

        console.log(userChats);

        tryStatus(res, `Own chats called succesfully!`, userChats)
    } catch (error) {
        catchStatus(req, 'CANNOT GET OWN CHATS', error)
    }
}

export const getChatsById = async (req, res) => {
    try {
        const userId = req.tokenData.userID
        const chatId = req.params.id

        if (!chatId) {
            return res.status(400).json({
                succes: false,
                message: `chat Id not valid!`
            })
        }

        const user = await User.findOne({ _id: userId })

        if (!user) {
            return res.status(400).json({
                succes: false,
                message: `user ${userId} doesn't exist!`
            })
        }

        if (!user.chat.includes(chatId)) {
            return res.status(400).json({
                succes: false,
                message: `This chat doesn't belong to you!`
            })
        }

        const chat = await Chat.findOne({
            _id: chatId
        })

        if (!chat) {
            return res.status(400).json({
                succes: false,
                message: `chat doesn't exist!`
            })
        }

        tryStatus(res, `Chat ${chatId} called succesfully!`, chat)
    } catch (error) {
        catchStatus(req, 'CANNOT GET CHAT', error)
    }
}
