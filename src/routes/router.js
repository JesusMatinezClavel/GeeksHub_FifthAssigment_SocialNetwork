import { Router } from "express";
import authRoute from "../entities/Authentication/auth.routes.js";
import userRoute from "../entities/user/user.routes.js"
import postRoute from "../entities/post/post.routes.js";


const router = Router()

router.use('/auth', authRoute)
router.use('/users', userRoute)
router.use('/posts', postRoute)

export default router