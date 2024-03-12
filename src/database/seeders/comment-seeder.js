import { faker, fakerES } from "@faker-js/faker";
import mongoose from "mongoose";
import Comment from "../../entities/comment/Comment.js";
import Post from "../../entities/post/Post.js";

export const commentSeeder = async () => {
    const users = await Post.find({ isActive: false })


    const generateRandomComment = () => {
        const _id = new mongoose.Types.ObjectId(faker.number.int())
        const sender = users[faker.number.int({ min: 0, max: 9 })]._id
        const receiver = users[faker.number.int({ min: 10, max: 19 })]._id
        const message = fakerES.lorem.sentences()

        const randomComment = {
            _id,
            sender,
            receiver,
            message,
        }
        return randomComment
    }



    const comments = []
    for (let i = 0; i < 30; i++) {
        comments.push(generateRandomComment())
        await User.findOneAndUpdate(
            {
                _id: comments[i].receiver
            },
            {
                $push: { comment: comments[i]._id }
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

    // await Comment.create(comments)

    console.log('------------------------------------------------');
    console.log('           random comments created!');
    console.log('------------------------------------------------');

}
