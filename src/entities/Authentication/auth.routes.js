import { Router } from "express";
import { logIn, logOut, register } from "./auth.controller.js";

const router = Router();

router.post('/register', register)
router.post('/login', logIn)
router.put('/login', logOut)

export default router










