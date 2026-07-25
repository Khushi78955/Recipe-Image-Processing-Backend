import sharp from "sharp";
import fs from "fs";
import path from "path";

const processedDir = path.join(process.cwd(), "uploads", "processed");
const thumbnailDir = path.join(process.cwd(), "uploads", "thumbnails");


[processedDir, thumbnailDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

export async function processImage(imagePath: string, fileName: string) {
    const processedPath = path.join(processedDir, fileName);
    const thumbnailPath = path.join(thumbnailDir, fileName);
    await sharp(imagePath)
        .resize({
            width: 1200,
            withoutEnlargement: true,
        })
        .jpeg({
            quality: 80,
        })
        .toFile(processedPath);

        
    await sharp(imagePath)
        .resize(200, 200)
        .jpeg({
            quality: 80,
        })
        .toFile(thumbnailPath);

    return {
        processedPath,
        thumbnailPath,
    };
}