import 'dotenv/config'
import bcrypt from "bcrypt";
import User from "../User/User.js";
import jwt from "jsonwebtoken";
import { userAge } from "../../utils/userAge.js";
import { catchStatus, tryStatus } from "../../utils/resStatus.js";



export const register = async (req, res) => {
    try {
        let { firstName, lastName, profileImg, bio, nickName, email, passwordBody, birthDate } = req.body

        if (!nickName || !email || !passwordBody || !birthDate) {
            return res.status(400).json({
                success: false,
                message: "Name, email, password or birthdate are invalid!"
            })
        }

        if (!profileImg || typeof (profileImg) !== 'string'||!profileImg.match(/\.(jpeg|jpg|gif|png)$/i)) {
            profileImg = User.call(profileImg).profileImg
        }

        const date = new Date(birthDate)

        const age = userAge(date)

        if (age < 18) {
            return res.status(400).json({
                success: false,
                message: `You have to be +18 to register!`
            })
        }

        if (passwordBody.length < 6 || passwordBody.length > 10) {
            return res.status(400).json({
                success: false,
                message: "Password must contain between 6 and 10 characters"
            })
        }

        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "format email invalid"
                }
            )
        }

        const passwordEncrypted = bcrypt.hashSync(passwordBody, 5)

        const user = await User.findOne({
            email: email
        })

        if (user) {
            return res.status(400).json({
                success: false,
                message: `email ${email} is already in use!`
            })
        }


        await User.create(
            {
                firstName,
                lastName,
                profileImg,
                bio,
                nickName,
                email,
                password: passwordEncrypted,
                birthDate: date,
                age
            }
        )
        const restProfile = {
            name: `${firstName} ${lastName}`,
            nickName,
            profileImg,
            age,
            bio,
            birthDate: date,
            email,
        }

        tryStatus(res, `user ${nickName} registered!`, restProfile)
    } catch (error) {
        catchStatus(res,`CANNOT REGISTER`, error.message)
    }
}

export const logIn = async (req, res) => {

    try {
        const email = req.body.email
        const password = req.body.password

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "email and password are mandatories"
            })
        }

        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email format is not valid"
                }
            )
        }

        const user = await User.findOne(
            {
                email: email
            }
        )

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email or password invalid"
            })
        }

        await User.findOneAndUpdate(
            {
                email: email
            },
            {
                isActive: true
            }
        )
        const isValidPassword = bcrypt.compareSync(password, user.password)

        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Email or password invalid"
            })
        }

        const token = jwt.sign(
            {
                userId: user.id,
                roleName: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        )

        tryStatus(res, `user ${user.nickName} loged in!`, token)
    } catch (error) {
        catchStatus(res,`CANNOT LOGIN`, error)
    }
}

export const logOut = async (req, res) => {
    try {
        const userID = req.tokenData.userId
        await User.findOneAndUpdate(
            {
                _id: userID
            },
            {
                isActive: false
            }
        )

        
        tryStatus(res, `user ${user.nickName} loged in!`)
    } catch (error) {
        catchStatus(res,`CANNOT LOGIN`, error)
    }
}

