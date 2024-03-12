import User from "../../entities/user/User.js";
import bcrypt from "bcrypt";
import { userAge } from "../../utils/userAge.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { faker, fakerES } from "@faker-js/faker";

export const userSeeder = async () => {
    const birthDate = new Date(1992, 6, 4);
    const controlUser = await User.create(
        {
            _id: new mongoose.Types.ObjectId('000000000000000000000001'),
            firstName: "control",
            lastName: "user",
            nickName: "user",
            profileImg: "../../../img/default-ProfileImg.png",
            bio: "Biography of an everyday user in a Social Network",
            birthDate: birthDate,
            age: userAge(birthDate),
            email: "user@user.com",
            password: bcrypt.hashSync('123456', 8),
            role: 'user'
        }
    )

    const controlAdmin = await User.create(
        {
            _id: new ObjectId('000000000000000000000002'),
            firstName: "control",
            lastName: "admin",
            nickName: "admin",
            profileImg: "../../../img/default-ProfileImg.png",
            bio: "Biography of an everyday admin in a Social Network",
            birthDate: birthDate,
            age: userAge(birthDate),
            email: "admin@admin.com",
            password: bcrypt.hashSync('123456', 8),
            role: 'admin'
        }
    )

    const controlSuperAdmin = await User.create(
        {
            _id: new ObjectId('000000000000000000000003'),
            firstName: "control",
            lastName: "superAdmin",
            nickName: "superAdmin",
            profileImg: "../../../img/default-ProfileImg.png",
            bio: "Biography of an everyday superAdmin in a Social Network",
            birthDate: birthDate,
            age: userAge(birthDate),
            email: "superAdmin@superAdmin.com",
            password: bcrypt.hashSync('123456', 8),
            role: 'superAdmin'
        }
    )

    console.log('------------------------------------------------');
    console.log('           control users created!');
    console.log('------------------------------------------------');

    const generateRandomUser = () => {
        const _id = new mongoose.Types.ObjectId(faker.number.int())
        const firstName = fakerES.person.firstName()
        const lastName = fakerES.person.lastName()
        const nickName = (fakerES.person.suffix() + fakerES.person.middleName() + faker.number.int({ min: 0, max: 20 }))
        const profileImg = faker.image.avatar()
        const bio = fakerES.person.bio()
        const birthDate = fakerES.date.past({ years: 18, refDate: '2024-03-11' })
        const age = faker.number.int({ min: 18, max: 50 })
        const email = faker.internet.email({ firstName: firstName, lastName: nickName })
        const password = faker.internet.password({ length: 8, memorable: true })

        const randomUser = {
            _id,
            firstName,
            lastName,
            nickName,
            profileImg,
            bio,
            birthDate,
            age,
            email,
            password
        }
        return randomUser
    }

    const users = []
    for (let i = 0; i < 17; i++) {
        users.push(generateRandomUser())
    }

    await User.create(users)

    const everyUser = await User.find({ isActive: false })

    const generateFolloweds = () => {
        const followeds = []
        for (let i = 0; i < (faker.number.int({ min: 0, max: 10 })); i++) {
            const randonNum = faker.number.int({ min: 0, max: 19 })
            !followeds.includes(randonNum)
                ? followeds.push((everyUser[randonNum]._id))
                : followeds.push((everyUser[faker.number.int({ min: 0, max: 19 })]._id))
        }
        return followeds
    }

    for (const element of everyUser) {
        await User.findOneAndUpdate(
            {
                _id: element._id
            },
            {
                $push: { followed: generateFolloweds() }
            },
            {
                new: true
            }
        )
    }

    const everyFollowed = await User.find({ isActive: false })

    for (const element of everyFollowed) {
        const followedId = element._id
        for (const target of element.followed) {
            await User.findOneAndUpdate(
                {
                    _id: target
                },
                {
                    $push: { followers: followedId }
                },
                {
                    new: true
                }
            )
        }
    }



    console.log('------------------------------------------------');
    console.log('           random users created!');
    console.log('------------------------------------------------');
};
