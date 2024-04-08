import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { getChatsById, getOwnChats } from "./chat.controller.js";

const router = Router();

router.get('/own', auth, getOwnChats)
router.get('/:id', auth, getChatsById)


export default router