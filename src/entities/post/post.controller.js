import { catchStatus, tryStatus } from "../../utils/resStatus.js"
import User from "../user/User.js"
import Post from "./Post.js"
import mongoose from "mongoose";


export const getPost = async (req, res) => {
    try {
        const userId = req.tokenData.userID
        const userPosts = await Post.find({ author: userId })

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
        const posts = await Post.find()
        console.log(posts.length);

        const postCreated = await Post.create({
            _id: new mongoose.Types.ObjectId(((posts.length + 1) * (1e-24)).toFixed(24).toString().split(".")[1]),
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

        await User.findOneAndUpdate(
            {
                _id: user._id
            },
            {
                $push: { posts: postCreated }
            }
        )


        tryStatus(res, 'new Post created', newPost)
    } catch (error) {
        catchStatus(res, 'CANNOT CREATE POST', error)
    }
}

export const deletePostbyId = async (req, res) => {
    try {

        const postId = new mongoose.Types.ObjectId(((req.params.id) * (1e-24)).toFixed(24).toString().split(".")[1])
        const userId = req.tokenData.userID
        console.log(postId);

        if (!postId) {
            return res.status(400).json({
                success: false,
                message: `Invalid post ID!`
            })
        }

        const post = await Post.findOne({ _id: postId })

        if (!post) {
            return res.status(400).json({
                success: false,
                message: `post ${req.params.id} doesn't exist!`
            })
        }

        const user = await User.findOne({ _id: userId })

        if (!user.posts.includes(postId)){
            return res.status(400).json({
                success: false,
                message: `Post ${req.params.id} doesn't belong to you!`
            })
        }


            await Post.deleteOne(
                {
                    _id: postId,
                    author: userId
                }
            )



        tryStatus(res, `Post ${req.params.id} deleted!`)
    } catch (error) {
        catchStatus(res, 'CANNOT DELETE POST', error)
    }
}

