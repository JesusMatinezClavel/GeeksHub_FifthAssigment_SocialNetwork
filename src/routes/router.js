import { Router } from "express";
import authRoute from "../entities/authentication/auth.routes.js";
import userRoute from "../entities/user/user.routes.js"
import postRoute from "../entities/post/post.routes.js";
import chatRoute from "../entities/chat/chat.routes.js";


const router = Router()

router.use('/auth', authRoute)
router.use('/users', userRoute)
router.use('/posts', postRoute)
router.use('/chats', chatRoute)

export default router