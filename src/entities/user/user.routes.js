import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { follow, getUser, getOwnProfile, unFollow, updateOwnProfile } from "./user.controller.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.middleware.js";

const router = Router();

router.get('/', auth, isSuperadmin, getUser)
router.get('/profile', auth, getOwnProfile)
router.put('/profile', auth, updateOwnProfile)
router.put('/follow/', auth, follow)
router.put('/unfollow/', auth, unFollow)


export default router










