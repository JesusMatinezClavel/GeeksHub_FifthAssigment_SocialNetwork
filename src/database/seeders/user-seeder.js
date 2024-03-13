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
            role: 'superadmin'
        }
    )

    console.log('------------------------------------------------');
    console.log('           control users created!');
    console.log('------------------------------------------------');

    const generateRandomUser = (i) => {
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
        users[i]._id = new mongoose.Types.ObjectId(((4 + i) * (1e-24)).toFixed(24).toString().split(".")[1])
    }

    await User.create(users)

    const everyUser = await User.find()


    const generateFolloweds = () => {
        const followeds = []
        for (let i = 0; i < (faker.number.int({ min: 0, max: 10 })); i++) {
            const randonNum = faker.number.int({ min: 0, max: 19 })
            !followeds.includes(everyUser[randonNum]._id)
                ? followeds.push((everyUser[randonNum]._id))
                : i -= 1
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
        if (element.followed.includes(element._id)) {
            element.followed.pull(element._id)
        }
    }

    const everyFollowed = await User.find()

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
