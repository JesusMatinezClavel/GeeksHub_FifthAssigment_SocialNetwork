import { Router } from "express";
import { getFileAvatar, getFilePost } from "./file.controller.js";
import multer from "multer";
import fs from "fs";

const uploadAvatar = multer({ dest: 'img/avatars' })
const uploadPost = multer({ dest: 'img/posts' })
const router = Router();

router.get('/avatars/:filename', getFileAvatar)
router.get('/posts/:filename', getFilePost)

router.post('/uploadAvatar', uploadAvatar.single("profileImg"), (req, res) => {
    const newPath = `img/avatars/${req.file.originalname}`;
    fs.renameSync(req.file.path, newPath);
    res.send({ message: 'La imagen se ha subido correctamente', success: true, data: newPath })
})

router.post('/uploadPost', uploadPost.single("media"), (req, res) => {
    const newPath = `img/posts/${req.file.originalname}`;
    fs.renameSync(req.file.path, newPath);
    res.send({ message: 'La imagen se ha subido correctamente', success: true, data: newPath })
})

export default router