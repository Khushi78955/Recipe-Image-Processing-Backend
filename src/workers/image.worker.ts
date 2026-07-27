import { Worker } from "bullmq";
import { redisConnection } from "../config/redis.js";
import { processImage } from "../services/image.service.js";
import prisma from "../config/db.js";

export const imageWorker = new Worker(
    "image-processing",
    async (job) => {
    console.log(`Processing job ${job.id}`);

    try {
        const result = await processImage(
            job.data.imagePath,
            job.data.fileName
        );

        await prisma.recipe.update({
            where: {
                id: job.data.recipeId,
            },
            data: {
                processedImage: result.processedPath,
                thumbnailImage: result.thumbnailPath,
                status: "completed",
            },
        });

        console.log(`Finished job ${job.id}`);
    } catch (error) {
        await prisma.recipe.update({
            where: {
                id: job.data.recipeId,
            },
            data: {
                status: "failed",
            },
        })        
        console.error("Worker error:", error);
    }
},
    {
        connection: redisConnection,
    }
);