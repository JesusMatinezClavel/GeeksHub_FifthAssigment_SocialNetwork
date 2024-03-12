import { faker, fakerES } from "@faker-js/faker";
import User from "../../entities/user_FIX/User.js";
import Post from "../../entities/post/Post.js";
import mongoose from "mongoose";

export const postSeeder = async () => {
    const users = await User.find({ isActive: false })

    const generateRandomPost = () => {
        const _id = new mongoose.Types.ObjectId(faker.number.int())
        const author = users[parseInt((Math.random() * 18) + 2)]._id
        const title = fakerES.lorem.words()
        const media = faker.image.url()
        const description = fakerES.lorem.paragraph()

        const randomPost = {
            _id,
            author,
            title,
            description,
            media
        }

        return randomPost
    }



    const posts = []
    for (let i = 0; i < 20; i++) {
        posts.push(generateRandomPost())
        await User.findOneAndUpdate(
            {
                _id: posts[i].author
            },
            {
                $push: { posts: posts[i]._id }
            },
            {
                new: true
            }
        )
        const updatedUser = await User.findOne({ _id: posts[i].author })
    }
    await Post.create(posts)

    console.log('------------------------------------------------');
    console.log('           random posts created!');
    console.log('------------------------------------------------');

}
