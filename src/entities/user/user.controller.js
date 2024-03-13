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

export const ownProfile = async (req, res) => {
    try {
        const userId = req.tokenData.userID
        const user = await User.findOne({ _id: userId })
        const ownProfile = {
            name: `${user.firstName} ${user.lastName}`,
            profileImg: user.profileImg,
            nickName: user.nickName,
            age: user.age,
            email: user.email,
            chats: user.chat.length,
            liked: user.liked.length,
            posts: user.posts.length,
            followers: user.followers.length,
            follows: user.followed.length
        }
        tryStatus(res, `profile called succesfully`, ownProfile)
    } catch (error) {
        catchStatus(res, `CANNOT CALL OWN PROFILE`, error)
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

        await User.updateOne(
            {
                nickName: follow
            },
            {
                $push: { followers: user }
            }
        )

        tryStatus(res, `user ${followUser.nickName} followed succesfully`)
    } catch (error) {
        console.log(error);
        catchStatus(res, `CANNOT FOLLOW USERS`, error)
    }
}

export const unFollow = async (req, res) => {
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
            if (user.followed.some(element => !element.equals(followUser._id))) {
                return res.status(400).json({
                    success: false,
                    message: `Your are not following ${followUser.nickName}!`
                })
            }
        }
        if (user.followed.length === 0) {
            return res.status(400).json({
                success: false,
                message: `Your are not following anyone!`
            })
        }

        await User.updateOne(
            {
                _id: userID
            },
            {
                $pull: { followed: followUser._id }
            }
        )

        await User.updateOne(
            {
                nickName: follow
            },
            {
                $pull: { followers: user._id }
            }
        )

        tryStatus(res, `user ${followUser.nickName} unfollowed succesfully`)
    } catch (error) {
        console.log(error);
        catchStatus(res, `CANNOT UNFOLLOW USERS`, error)
    }
}

