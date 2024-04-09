import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { getCommentsById } from "./comment.controller.js";

const router = Router();

router.get('/:id', auth, getCommentsById)

export default router