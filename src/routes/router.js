import { Router } from "express";
import authRoute from "../entities/authentication/auth.routes.js";
import userRoute from "../entities/user/user.routes.js"
import postRoute from "../entities/post/post.routes.js";
import chatRoute from "../entities/chat/chat.routes.js";
import commentRoute from "../entities/comment/comment.routes.js";
import fileRoute from "../entities/file/file.routes.js";
import multer from "multer";
import fs from "fs";

const router = Router()

router.use('/auth', authRoute)
router.use('/users', userRoute)
router.use('/posts', postRoute)
router.use('/chats', chatRoute)
router.use('/comments', commentRoute)
router.use('/files', fileRoute)


export default router