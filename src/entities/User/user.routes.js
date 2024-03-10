import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { getUser } from "./user.controller.js";

const router = Router();

router.get('', getUser)


export default router










