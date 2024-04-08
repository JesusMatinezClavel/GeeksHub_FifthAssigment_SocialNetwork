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

