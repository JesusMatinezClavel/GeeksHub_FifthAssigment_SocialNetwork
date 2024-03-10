import { catchStatus, tryStatus } from "../../utils/resStatus.js";
import User from "./User.js";

export const getUser = async (req, res) => { 
    try {
        const user = await User.find()
        tryStatus(res,`users called succesfully`,user)
    } catch (error) {
        catchStatus(res,`CANNOT CALL USERS`,error)
    }
}