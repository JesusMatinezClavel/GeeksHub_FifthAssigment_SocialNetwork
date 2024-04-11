import { catchStatus, tryStatus } from "../../utils/resStatus.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const getFileAvatar = async (req, res) => {
    try {
        const fileName = req.params.filename;
        const filePath = path.join(__dirname, '../../../', 'img/avatars', fileName)

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "File doesn't exist!" });
        }

        const fileStream = fs.createReadStream(filePath)
        console.log(fileStream);
        fileStream.pipe(res)
    } catch (error) {
        catchStatus(res, 'CANNOT GET FILE', error)
    }
}

export const getFilePost = async (req, res) => {
    try {
        const fileName = req.params.filename;
        const filePath = path.join(__dirname, '../../../', 'img/posts', fileName)

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "File doesn't exist!" });
        }

        const fileStream = fs.createReadStream(filePath)
        console.log(fileStream);
        fileStream.pipe(res)
    } catch (error) {
        catchStatus(res, 'CANNOT GET FILE', error)
    }
}

// export const uploadFile = (req, res) => {
//   try {
//     const newPath = `img/avatars/${req.file.originalname}`;
//     fs.renameSync(req.file.path, newPath);
//     res.send({ message: 'La imagen se ha subido correctamente', success: true, data: newPath });
//   } catch (error) {
//     catchStatus(res, 'CANNOT GET FILE', error);
//   }
// };