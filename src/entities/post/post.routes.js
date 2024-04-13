import { Router } from "express";
import { addRemoveLike, deletePostSuperadmin, deletePostbyId, getAllPosts, getAuthor, getPost, getPostbyId, getPostbyUserId, newPost, updateOwnPost } from "./post.controller.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { isSuperadmin } from "../../middlewares/isSuperadmin.middleware.js";

const router = Router();

router.get('/own', auth, getPost)
router.get('/', auth, getAllPosts)
router.get('/author/:id', auth, getAuthor)
router.get('/:id', auth, getPostbyId)
router.get('/user/:id', auth, getPostbyUserId)
router.post('/', auth, newPost)
router.delete('/:id', auth, deletePostbyId)
router.delete('/delete/:id', auth, isSuperadmin, deletePostSuperadmin)
router.put('/', auth, updateOwnPost)
router.put('/like/:id', auth, addRemoveLike)

export default router