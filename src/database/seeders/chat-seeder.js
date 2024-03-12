import { faker, fakerES } from "@faker-js/faker";
import User from "../../entities/user/User.js";
import mongoose from "mongoose";
import Chat from "../../entities/chat/Chat.js";

export const chatSeeder = async () => {
    const users = await User.find({ isActive: false })
    const generateRandomChat = () => {


        const _id = new mongoose.Types.ObjectId(faker.number.int())
        const sender = users[faker.number.int({ min: 0, max: 9 })]._id
        const receiver = users[faker.number.int({ min: 10, max: 19 })]._id
        const message = fakerES.lorem.sentences()

        const randomChat = {
            _id,
            sender,
            receiver,
            message,
        }
        return randomChat
    }



    const chats = []
    for (let i = 0; i < 30; i++) {
        chats.push(generateRandomChat())
        await User.findOneAndUpdate(
            {
                _id: chats[i].receiver
            },
            {
                $push: { chat: chats[i]._id }
            },
            {
                new: true
            }
        )
        await User.findOneAndUpdate(
            {
                _id: chats[i].sender
            },
            {
                $push: { chat: chats[i]._id }
            },
            {
                new: true
            }
        )
    }

    await Chat.create(chats)

    console.log('------------------------------------------------');
    console.log('           random chats created!');
    console.log('------------------------------------------------');

}
