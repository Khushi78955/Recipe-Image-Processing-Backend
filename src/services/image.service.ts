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

export async function processImage(imageName: string, fileName: string) {
    const originalImagePath = path.join(
        process.cwd(),
        "uploads",
        "originals",
        imageName
    );
    const processedPath = path.join(processedDir, fileName);
    const thumbnailPath = path.join(thumbnailDir, fileName);
    await sharp(originalImagePath)
        .resize({
            width: 1200,
            withoutEnlargement: true,
        })
        .jpeg({
            quality: 80,
        })
        .toFile(processedPath);


    await sharp(originalImagePath)
        .resize(200, 200)
        .jpeg({
            quality: 80,
        })
        .toFile(thumbnailPath);

    return {
        processedPath: path.join("uploads", "processed", fileName),
        thumbnailPath: path.join("uploads", "thumbnails", fileName)
    }
}