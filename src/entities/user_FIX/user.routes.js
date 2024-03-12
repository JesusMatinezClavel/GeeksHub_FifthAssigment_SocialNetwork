import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { follow, getUser, unFollow } from "../user_FIX/user.controller.js";

const router = Router();

router.get('/', getUser)
router.put('/follow/', auth, follow)
router.put('/unfollow/', auth, unFollow)


export default router










