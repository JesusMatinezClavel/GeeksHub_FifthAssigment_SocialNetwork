import { Router } from "express";
import { deletePostbyId, getPost, newPost } from "./post.controller.js";
import { auth } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get('/', auth, getPost)
router.post('/', auth, newPost)
router.delete('/:id', auth, deletePostbyId)

export default router