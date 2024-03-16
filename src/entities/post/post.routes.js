import { Router } from "express";
import { deletePostbyId, getAllPosts, getPost, newPost, updateOwnPost } from "./post.controller.js";
import { auth } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get('/own', auth, getPost)
router.get('/', auth, getAllPosts)
router.post('/', auth, newPost)
router.delete('/:id', auth, deletePostbyId)
router.put('/', auth, updateOwnPost)

export default router