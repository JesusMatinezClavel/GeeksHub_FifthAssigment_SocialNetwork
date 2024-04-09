import { catchStatus, tryStatus } from "../../utils/resStatus.js";
import Comment from "./Comment.js";
import User from "../../entities/user/User.js";

export const getCommentsById = async (req, res) => {
    try {
        const userId = req.tokenData.userID
        const commentId = req.params.id

        if (!commentId) {
            return res.status(400).json({
                succes: false,
                message: `comment Id not valid!`
            })
        }

        const user = await User.findOne({ _id: userId })

        if (!user) {
            return res.status(400).json({
                succes: false,
                message: `user ${userId} doesn't exist!`
            })
        }

        if (!user.comment.includes(commentId)) {
            return res.status(400).json({
                succes: false,
                message: `This comment doesn't belong to you!`
            })
        }

        const comment = await Comment.findOne({
            _id: commentId
        })

        if (!comment) {
            return res.status(400).json({
                succes: false,
                message: `comment doesn't exist!`
            })
        }

        tryStatus(res, `Comments called succesfully!`, comment)
    } catch (error) {
        catchStatus(req, 'CANNOT GET COMMENT', error)
    }
}