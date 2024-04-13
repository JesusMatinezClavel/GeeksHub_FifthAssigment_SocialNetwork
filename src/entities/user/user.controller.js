import { catchStatus, tryStatus } from "../../utils/resStatus.js";
import Post from "../post/Post.js";
import User from "./User.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import dayjs from "dayjs";

export const getUsers = async (req, res) => {
    try {
        // Ponemos un límite a elegir en el Query (siendo este 5 si no se especifica)
        let limit = Number(req.query.limit) || 5
        // Ponemos la página que queremos ver (siendo esta la 1 si no se especifica)
        const page = Number(req.query.page) || 1
        // Hacemos un cálculo por el cual podemos elegir los Users a mostrar dependiendo del limit
        const skip = (page - 1) * limit
        const lengUsers = await User.find()

        // Hacemos validaciones a estos 3 valores para asegurarnos de que son valores válidos
        if (limit <= 0 || page <= 0 || !Number.isInteger(limit) || !Number.isInteger(page)) {
            return res.status(400).json({
                succes: false,
                message: `Limit or page selected are not valid`
            })
        }
        // El límite máximo será 20
        if (limit > 20) {
            limit = 20
        }
        // Si Skip sobrepasa la cantidad de Users dará un error
        if (skip >= lengUsers.length) {
            return res.status(400).json({
                success: false,
                message: `There are no more users to call`
            })
        }
        const users = await User.find().skip(skip).limit(limit)
        tryStatus(res, `users called succesfully`, users)
    } catch (error) {
        catchStatus(res, `CANNOT CALL USERS`, error)
    }
}
export const getOwnProfile = async (req, res) => {
    try {
        const userId = req.tokenData.userID
        const user = await User.findOne({ _id: userId })
            .populate('comment')
            .populate('posts')
            .populate('chat')
            .populate('followers')
            .populate('followed')
            .populate('liked')
            
        if (!user) {
            return res.status(400).json({
                succes: false,
                message: `user doesn't exist!`
            })
        }

        const userProfile = {
            firstName: user.firstName,
            lastName: user.lastName,
            nickName: user.nickName,
            profileImg: user.profileImg,
            bio: user.bio,
            age: user.age,
            birthdate: dayjs(user.birthDate).format('YYYY-MM-DD'),
            email: user.email,
            followers: user.followers,
            followed: user.followed,
            chat: user.chat,
            comment: user.comment,
            posts: user.posts,
            liked: user.liked
        }
        tryStatus(res, `profile called succesfully`, userProfile)
    } catch (error) {
        catchStatus(res, `CANNOT CALL OWN PROFILE`, error)
    }
}
export const getUserbyEmail = async (req, res) => {
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
            firstName: user.firstName,
            lastName: user.lastName,
            nickName: user.nickName,
            profileImg: user.profileImg,
            bio: user.bio,
            age: user.age,
            birthDate: user.birthDate,
            email: user.email,
        }
        tryStatus(res, `profile called succesfully`, userProfile)
    } catch (error) {
        catchStatus(res, `CANNOT CALL OWN PROFILE`, error)
    }
}
export const getPostsbyUserId = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(((req.params.id) * (1e-24)).toFixed(24).toString().split(".")[1])
        const ownId = req.tokenData.userID

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: `Invalid user ID!`
            })
        }

        const user = await User.findOne({ _id: userId })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: `user ${req.params.id} doesn't exist!`
            })
        }

        const userPosts = await Post.find(
            {
                author: userId
            }
        )

        tryStatus(res, `Posts from user ${req.params.id} called succesfully!`, userPosts)
    } catch (error) {
        catchStatus(res, `CANNOT CALL POSTS BY ID`, error)
    }
}
export const updateOwnProfile = async (req, res) => {
    try {
        const userId = req.tokenData.userID
        let { firstName, lastName, profileImg, bio, nickName, password, passwordCheck } = req.body
        const userBefore = await User.findOne({ _id: userId })

        if (firstName === "") {
            firstName = userBefore.firstName
        }
        if (lastName === "") {
            lastName = userBefore.lastName
        }
        if (profileImg === "" || profileImg === userBefore.profileImg) {
            profileImg = userBefore.profileImg
        }
        if (bio === "") {
            bio = userBefore.bio
        }
        if (nickName === "") {
            nickName = userBefore.nickName
        }
        if (password === "") {
            password = userBefore.password
        } else if (password !== passwordCheck) {
            return res.status(400).json({
                success: false,
                message: `passwordCheck is different from password!`
            })
        }
        if (profileImg !== "") {
            if (typeof (profileImg) !== 'string' || !profileImg.match(/\.(jpeg|jpg|gif|png)$/i)) {
                return res.status(400).json({
                    success: false,
                    message: `The profileImg has no valid format!`
                })
            }
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
                password: passwordHash,
            }
        )
        tryStatus(res, `profile updated succesfully`)
    } catch (error) {
        catchStatus(res, `CANNOT UPDATE OWN PROFILE`, error)
    }
}
export const follow = async (req, res) => {
    try {
        const userID = req.tokenData.userID
        const follow = new mongoose.Types.ObjectId((Number(req.params.id) * (1e-24)).toFixed(24).toString().split(".")[1])


        if (!follow) {
            return res.status(400).json({
                success: false,
                message: `id is invalid!`
            })
        }

        const followUser = await User.findOne({ _id: follow })

        if (!followUser) {
            return res.status(400).json({
                success: false,
                message: `user: ${follow} doesn't exist!`
            })
        }

        const user = await User.findOne({ _id: userID })

        if (!user.followed.includes(followUser._id)) {
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
                    _id: follow
                },
                {
                    $push: { followers: user }
                }
            )
            tryStatus(res, `user ${followUser.nickName} followed succesfully`)
        } else {
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
                    _id: follow
                },
                {
                    $pull: { followers: user._id }
                }
            )
            tryStatus(res, `user ${followUser.nickName} unfollowed succesfully`)

        }


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
export const deleteUserbyId = async (req, res) => {
    try {
        const id = req.params.id
        if (id <= "0") {
            return res.status(400).json({
                success: false,
                message: `id is not valid!`
            })
        }
        const userId = new mongoose.Types.ObjectId((Number(id) * (1e-24)).toFixed(24).toString().split(".")[1])
        const user = await User.find({ _id: userId })
        if (!user[0]) {
            return res.status(400).json({
                success: false,
                message: `User doesn't exist!`
            })
        }
        await User.deleteOne(user[0])
        tryStatus(res, `user ${user[0].nickName} deleted succesfully`)
    } catch (error) {
        console.log(error);
        catchStatus(res, `CANNOT DELETE USER`, error)
    }
}
export const updateRole = async (req, res) => {
    try {
        const id = req.params.id
        if (id <= "0") {
            return res.status(400).json({
                success: false,
                message: `id is not valid!`
            })
        }
        const userId = new mongoose.Types.ObjectId((Number(id) * (1e-24)).toFixed(24).toString().split(".")[1])
        const user = await User.find({ _id: userId })
        if (!user[0]) {
            return res.status(400).json({
                success: false,
                message: `User doesn't exist!`
            })
        }
        const { role } = req.body
        console.log(role);
        if (role !== "user" && role !== "admin" && role !== "superadmin") {
            return res.status(400).json({
                success: false,
                message: `role is invalid!`
            })
        }


        await User.findOneAndUpdate(
            {
                _id: userId
            },
            {
                role: role
            }
        )

        const userAfter = await User.findOne({ _id: userId })
        const userUpdate = {
            name: `${userAfter.firstName} ${userAfter.lastName}`,
            profileImg: userAfter.profileImg,
            nickName: userAfter.nickName,
            age: userAfter.age,
            email: userAfter.email,
            role: userAfter.role
        }
        tryStatus(res, `profile updated succesfully`, userUpdate)
    } catch (error) {
        catchStatus(res, `CANNOT UPDATE OWN PROFILE`, error)
    }
}

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                success: false,
                message: `id is not valid!`
            })
        }


        const user = await User.findOne({ _id: id })


        tryStatus(res, `user ${id} called succesfully`, user)
    } catch (error) {
        catchStatus(res, `CANNOT CALL USER BY ID`, error)
    }

}
