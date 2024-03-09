import { Router } from "express";
import authRoute from "./auth.routes.js";
// import { userRoute } from "./user.routes.js";


const router = Router()

router.use('/auth', authRoute)
// router.use('/users', userRoute)

export default router