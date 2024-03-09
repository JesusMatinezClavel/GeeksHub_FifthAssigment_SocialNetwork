import { Router } from "express";
import authRoute from "../entities/Authentication/auth.routes.js";


const router = Router()

router.use('/auth', authRoute)

export default router