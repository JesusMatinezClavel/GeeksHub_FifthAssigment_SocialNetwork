import { catchStatus } from "../utils/resStatus.js";
import jwt from "jsonwebtoken";

export const auth = (req,res,next) => { 
    try {
        const token = req.headers.authorization.split(" ")[1]

        if(!token){
            return res.status(400).json({
                success: false,
                message: `TOKEN NOT FOUND`
            })
        }

        const tokenValid = jwt.verify(token,process.env.JWT_SECRET)

        if(!tokenValid){
            return res.status(400).json({
                success: false,
                message: `TOKEN INVALID`
            })
        }

        req.tokenData = {
            userID: tokenValid.userId,
            nickName: tokenValid.nickName,
            roleName: tokenValid.roleName
        }

        next()
    } catch (error) {
        catchStatus(res,'TOKEN ERROR',error)
    }
}