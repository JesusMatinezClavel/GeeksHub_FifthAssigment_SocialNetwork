import { catchStatus, tryStatus } from "../../utils/resStatus.js"
import User from "../user/User.js"
import Post from "./Post.js"



export const getPost = async (req, res) => {
    try {
        const userId = req.tokenData.userID
        const userPosts = await Post.find({ author: { _id: userId } })

        tryStatus(res, 'Posts called succesfully!', userPosts)
    } catch (error) {
        catchStatus(req, 'CANNOT GET POSTS', error)
    }
}

export const newPost = async (req, res) => {
    try {

        let { title, description, media } = req.body
        const userId = req.tokenData.userID

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: `title, description or media are invalid!`
            })
        }

        if (media !== "") {
            if (typeof (media) !== 'string' || !media.match(/\.(jpeg|jpg|gif|png)$/i)) {
                return res.status(400).json({
                    success: false,
                    message: `The media has no valid format!`
                })
            }
        }

        const user = await User.findOne({ _id: userId })

        await Post.create({
            title: title,
            description: description,
            author: user,
            media: media
        })

        const newPost = {
            author: user.nickName,
            title,
            media,
            description
        }


        tryStatus(res, 'new Post created', newPost)
    } catch (error) {
        catchStatus(res, 'CANNOT CREATE POST', error)
    }
}


