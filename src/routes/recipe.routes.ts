import { Router } from "express";
import { createRecipeController, getAllRecipesController, getRecipeByIdController, updateRecipeController, deleteRecipeController } from "../controllers/recipe.controller.js";

const router = Router();

router.post("/", createRecipeController);
router.get("/", getAllRecipesController);
router.get("/:id", getRecipeByIdController);
router.put("/:id", updateRecipeController);
router.delete("/:id", deleteRecipeController);

export default router;