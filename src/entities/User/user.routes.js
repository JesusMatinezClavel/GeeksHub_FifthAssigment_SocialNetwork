import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { follow, getUser } from "./user.controller.js";

const router = Router();

router.get('/', getUser)
router.put('/', auth, follow)


export default router










