import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { userAge } from "../utils/userAge.js";


export const register = async (req, res) => {
    try {
        const { firstName, lastName, bio, nickName, email, passwordBody, birthDate } = req.body

        if (!nickName || !email || !passwordBody || !birthDate) {
            return res.status(400).json({
                success: false,
                message: "Name, email or password are invalid!"
            })
        }

        const date = new Date(birthDate)
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
        let age = userAge(date)
        console.log(age);

        const newUser = await User.create(
            {
                firstName,
                lastName,
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
            age,         
            bio,
            birthDate: date,
            email,
        }

        res.status(201).json({
            success: true,
            message: "User registered succesfully",
            data: restProfile
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "User cant be registered",
            error: error.message
        })
    }
}

export const login = async (req, res) => {

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

        console.log(user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email or password invalid"
            })
        }

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

        res.status(200).json({
            success: true,
            message: "User logged succesfully",
            token: token //MOSTRAMOS EL TOKEN DE MANERA TEMPORAL PARA PODER PROBAR CON ÉL OTRA FUNCIONALIDADES
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "User cant be logged",
            error: error
        })
    }
}

