import { Router } from "express";
import { createRecipeController, getAllRecipesController, getRecipeByIdController, updateRecipeController, deleteRecipeController } from "../controllers/recipe.controller.js";
import { upload } from "../middleware/upload.middleware.js";

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


            return res.status(202).json({
                success: true,
                message: "Image uploaded successfully",
                fileName: req.file.filename,
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