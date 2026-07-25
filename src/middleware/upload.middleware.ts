import multer from "multer";
import path from "path";
import fs from "fs";


const uploadPath = path.join(process.cwd(), "uploads", "originals");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}


const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadPath)
    },
    filename: (_req, file, cb) => {
        const uniqueName =
            `${Date.now()}-${Math.random().toString(36).substring(2)}${path.extname(file.originalname)}`
        cb(null, uniqueName)
    }
})


const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed."));
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
})