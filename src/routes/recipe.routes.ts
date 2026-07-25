import { Router } from "express";
import { createRecipeController, getAllRecipesController, getRecipeByIdController, updateRecipeController, deleteRecipeController } from "../controllers/recipe.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/v1/recipes:
 *   get:
 *     summary: Get all recipes
 *     description: Retrieve recipes with pagination, filtering, sorting and search.
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of recipes per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by recipe status
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search recipes by title
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum:
 *             - title
 *             - createdAt
 *             - status
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Recipes retrieved successfully
 */


/**
 * @swagger
 * /api/v1/recipes:
 *   post:
 *     summary: Create a new recipe
 *     tags:
 *       - Recipes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - imageUrl
 *             properties:
 *               title:
 *                 type: string
 *                 example: Chicken Curry
 *               description:
 *                 type: string
 *                 example: Delicious homemade chicken curry.
 *               imageUrl:
 *                 type: string
 *                 example: 1785008629532-zgg1r0rj4bc.jpeg
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *       400:
 *         description: Invalid request
 */


/**
 * @swagger
 * /api/v1/recipes/upload:
 *   post:
 *     summary: Upload a recipe image
 *     tags:
 *       - Recipes
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       202:
 *         description: Image uploaded successfully
 *       400:
 *         description: No image uploaded
 */



/**
 * @swagger
 * /api/v1/recipes/{id}:
 *   get:
 *     summary: Get a recipe by ID
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe retrieved successfully
 *       404:
 *         description: Recipe not found
 */



/**
 * @swagger
 * /api/v1/recipes/{id}:
 *   put:
 *     summary: Update a recipe
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Recipe ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *       404:
 *         description: Recipe not found
 */


/**
 * @swagger
 * /api/v1/recipes/{id}:
 *   delete:
 *     summary: Delete a recipe
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       404:
 *         description: Recipe not found
 */


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