import { faker, fakerES } from "@faker-js/faker";
import mongoose from "mongoose";
import Comment from "../../entities/comment/Comment.js";
import User from "../../entities/user/User.js";
import Post from "../../entities/post/Post.js";

export const commentSeeder = async () => {

    const users = await User.find()
    const posts = await Post.find()

    const generateRandomComment = () => {
        const sender = users[faker.number.int({ min: 0, max: 9 })]._id
        const postTarget = posts[faker.number.int({ min: 10, max: 19 })]._id
        const message = fakerES.lorem.sentences()

        const randomComment = {
            sender,
            postTarget,
            message,
        }
        return randomComment
    }

    const comments = []
    for (let i = 0; i < 20; i++) {
        comments.push(generateRandomComment())
        comments[i]._id = new mongoose.Types.ObjectId(((1 + i) * (1e-24)).toFixed(24).toString().split(".")[1])
        await Post.findOneAndUpdate(
            {
                _id: comments[i].postTarget
            },
            {
                $push: { comments: comments[i]._id }
            },
            {
                new: true
            }
        )
        await User.findOneAndUpdate(
            {
                _id: comments[i].sender
            },
            {
                $push: { comment: comments[i]._id }
            },
            {
                new: true
            }
        )
    }


    await Comment.create(comments)

    console.log('------------------------------------------------');
    console.log('           random comments created!');
    console.log('------------------------------------------------');

}
