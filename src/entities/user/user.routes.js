import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { follow, getUser, getOwnProfile, unFollow, updateOwnProfile, getUserbyEmail, deleteUserbyId } from "./user.controller.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.middleware.js";

const router = Router();

router.get('/', auth, isSuperadmin, getUser)
router.get('/email', auth, isSuperadmin, getUserbyEmail)
router.get('/profile', auth, getOwnProfile)
router.put('/profile', auth, updateOwnProfile)
router.put('/follow/', auth, follow)
router.put('/unfollow/', auth, unFollow)
router.delete('/:id', auth, isSuperadmin, deleteUserbyId)


export default router










