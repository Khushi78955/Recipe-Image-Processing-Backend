import { Router } from "express";
import { createRecipeController, getAllRecipesController, getRecipeByIdController, updateRecipeController, deleteRecipeController } from "../controllers/recipe.controller.js";
import { upload } from "../middleware/upload.middleware.js";
import { processImage } from "../services/image.service.js";

const router = Router();

router.post("/", createRecipeController);
router.get("/", getAllRecipesController);
router.post(
    "/upload",
    upload.single("image"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No image uploaded",
                });
            }

            const result = await processImage(
                req.file.path,
                req.file.filename
            );

            return res.status(200).json({
                success: true,
                message: "Image uploaded and processed successfully",
                original: req.file.path,
                processed: result.processedPath,
                thumbnail: result.thumbnailPath,
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                success: false,
                message: "Failed to process image",
            });
        }
    }
);
router.get("/:id", getRecipeByIdController);
router.put("/:id", updateRecipeController);
router.delete("/:id", deleteRecipeController);

export default router;