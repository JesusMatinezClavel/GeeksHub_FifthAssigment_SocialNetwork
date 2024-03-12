import { faker, fakerES } from "@faker-js/faker";
import User from "../../entities/user/User.js";
import Post from "../../entities/post/Post.js";
import mongoose from "mongoose";

export const postSeeder = async () => {
    const users = await User.find({ isActive: false })

    const generateLikes = () => {
        const userLikes = []
        const randomNum = faker.number.int({ min: 0, max: 10 })
        for (let i = 0; i < randomNum; i++) {
            const randomNumIndex = faker.number.int({ min: 0, max: 19 })
            !userLikes.includes(randomNumIndex)
                ? userLikes.push((users[randomNumIndex])._id)
                : i = - 1
        }
        return userLikes
    }

    const generateRandomPost = () => {
        const _id = new mongoose.Types.ObjectId(faker.number.int())
        const author = users[parseInt((Math.random() * 18) + 2)]._id
        const title = fakerES.lorem.words()
        const media = faker.image.url()
        const likes = generateLikes()
        const description = fakerES.lorem.paragraph()

        const randomPost = {
            _id,
            author,
            title,
            description,
            media,
            likes
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
    }

    for (const element of posts) {
        const postId = element._id
        for (const target of element.likes) {
            await User.findOneAndUpdate(
                {
                    _id: target
                },
                {
                    $push: { liked: postId }
                },
                {
                    new: true
                }
            );
        }
    }
    await Post.create(posts)

    console.log('------------------------------------------------');
    console.log('           random posts created!');
    console.log('------------------------------------------------');

}
