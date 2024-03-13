import { catchStatus, tryStatus } from "../../utils/resStatus.js";
import User from "./User.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
    try {
        const user = await User.find()
        tryStatus(res, `users called succesfully`, user)
    } catch (error) {
        catchStatus(res, `CANNOT CALL USERS`, error)
    }
}

export const getOwnProfile = async (req, res) => {
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

export const getUserbyId = async (req, res) => {
    try {
        const { email } = req.query
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "format email invalid"
                }
            )
        }
        const user = await User.findOne({ email: email })
        const userProfile = {
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
        tryStatus(res, `profile called succesfully`,userProfile)
    } catch (error) {
        catchStatus(res, `CANNOT CALL OWN PROFILE`, error)
    }
}

export const updateOwnProfile = async (req, res) => {
    try {
        const userId = req.tokenData.userID
        let { firstName, lastName, profileImg, bio, nickName, email, password, passwordCheck } = req.body
        const userBefore = await User.findOne({ _id: userId })

        if (firstName === "") {
            firstName = userBefore.firstName
        }
        if (lastName === "") {
            lastName = userBefore.lastName
        }
        if (profileImg === "") {
            profileImg = userBefore.profileImg
        }
        if (bio === "") {
            bio = userBefore.bio
        }
        if (nickName === "") {
            nickName = userBefore.nickName
        }
        if (email === "") {
            email = userBefore.email
        }
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "format email invalid"
                }
            )
        }
        if (password === "") {
            password = userBefore.password
        } else if (password !== passwordCheck) {
            return res.status(400).json({
                success: false,
                message: `passwordCheck is different from password!`
            })
        }


        const passwordHash = bcrypt.hashSync(password, 8)



        await User.findOneAndUpdate(
            {
                _id: userId
            },
            {
                firstName: firstName,
                lastName: lastName,
                nickName: nickName,
                profileImg: profileImg,
                bio: bio,
                email: email,
                password: passwordHash,
            }
        )

        const userAfter = await User.findOne({ _id: userId })
        const userUpdate = {
            name: `${userAfter.firstName} ${userAfter.lastName}`,
            profileImg: userAfter.profileImg,
            nickName: userAfter.nickName,
            age: userAfter.age,
            email: userAfter.email,
            chats: userAfter.chat.length,
            liked: userAfter.liked.length,
            posts: userAfter.posts.length,
            followers: userAfter.followers.length,
            follows: userAfter.followed.length
        }
        tryStatus(res, `profile updated succesfully`, userUpdate)
    } catch (error) {
        catchStatus(res, `CANNOT UPDATE OWN PROFILE`, error)
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

