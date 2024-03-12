import { faker, fakerES } from "@faker-js/faker";
import User from "../../entities/user/User.js";
import Post from "../../entities/post/Post.js";

export const postSeeder = async () => {
    const users = await User.find({ isActive: false })

    const generateRandomPost = () => {
        const author = users[parseInt((Math.random() * 18) + 2)]._id
        const title = fakerES.lorem.words()
        const media = faker.image.url()
        const description = fakerES.lorem.paragraph()

        const randomPost = {
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
        const updatedUser = await User.findOneAndUpdate(
            {
                _id: posts[i].author
            },
            {
                $push: { posts: posts[i] }
            }
        )
        console.log(updatedUser);
        break
    }
    // await Post.create(posts)

    console.log('------------------------------------------------');
    console.log('           random posts created!');
    console.log('------------------------------------------------');

}
