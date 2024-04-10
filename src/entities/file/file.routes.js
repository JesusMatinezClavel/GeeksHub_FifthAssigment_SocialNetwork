import { Router } from "express";
import { getFile } from "./file.controller.js";
import multer from "multer";
import fs from "fs";

const upload = multer({ dest: '../../../img/avatars' })
const router = Router();

router.get('/:filename', getFile)

router.post('/upload', upload.single("profileImg"), (req, res) => {
    const newPath = `../../../img/avatars/${req.file.originalname}`;
    fs.renameSync(req.file.path, newPath);
    res.send({ message: 'La imagen se ha subido correctamente', success: true })
})

export default router