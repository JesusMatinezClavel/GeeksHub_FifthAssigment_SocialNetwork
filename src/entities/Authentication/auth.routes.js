import { Router } from "express";
import { logIn, logOut, register } from "./auth.controller.js";
import { auth } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post('/register', register)
router.post('/login', logIn)
router.put('/logout', auth, logOut)

export default router










