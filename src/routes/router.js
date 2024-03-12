import { Router } from "express";
import { authRoute } from "../entities/authentication_FIX/auth.routes.js";
import { userRoute } from "../entities/user_FIX/user.routes.js";


const router = Router()

router.use('/auth', authRoute)
router.use('/users', userRoute)

export default router