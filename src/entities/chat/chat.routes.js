import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { getOwnChats } from "./chat.controller.js";

const router = Router();

router.get('/own', auth, getOwnChats)


export default router