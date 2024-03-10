import { catchStatus, tryStatus } from "../../utils/resStatus.js";
import User from "./User.js";

export const getUser = async (req, res) => {
    try {
        const user = await User.find()
        tryStatus(res, `users called succesfully`, user)
    } catch (error) {
        catchStatus(res, `CANNOT CALL USERS`, error)
    }
}

export const follow = async (req, res) => {
    try {
        const userID = req.tokenData.userID
        const follow = req.query.nickname

        if (!follow) {
            return res.status(400).json({
                success: false,
                message: `nickname is invalid!`
            })
        }

        const followUser = await User.findOne({ nickName: follow })

        if (!followUser) {
            return res.status(400).json({
                success: false,
                message: `user: ${follow} doesn't exist!`
            })
        }

        const user = await User.findOne({ _id: userID })

        if (!user.followed == []) {
            if (user.followed.some(element => element.equals(followUser._id))) {
                return res.status(400).json({
                    success: false,
                    message: `Your are already following ${followUser.nickName}!`
                })
            }
        }

        await User.updateOne(
            {
                _id: userID
            },
            {
                $push: { followed: followUser }
            }
        )

        tryStatus(res, `user ${followUser.nickName} followed succesfully`)
    } catch (error) {
        console.log(error);
        catchStatus(res, `CANNOT FOLLOW USERS`, error)
    }
}


