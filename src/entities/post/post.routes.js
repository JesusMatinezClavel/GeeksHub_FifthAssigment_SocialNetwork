import { Router } from "express";
import { addRemoveLike, deletePostbyId, getAllPosts, getPost, getPostbyId, getPostbyUserId, newPost, updateOwnPost } from "./post.controller.js";
import { auth } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get('/own', auth, getPost)
router.get('/', auth, getAllPosts)
router.get('/:id', auth, getPostbyId)
router.get('/user/:id', auth, getPostbyUserId)
router.post('/', auth, newPost)
router.delete('/:id', auth, deletePostbyId)
router.put('/', auth, updateOwnPost)
router.put('/like/:id', auth, addRemoveLike)

export default router