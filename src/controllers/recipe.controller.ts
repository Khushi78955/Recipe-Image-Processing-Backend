import type {Request, Response} from "express";
import { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe } from "../services/recipe.service.js";
import { createRecipeSchema, updateRecipeSchema } from "../validators/recipe.validator.js";

export async function createRecipeController(req: Request, res: Response){
    try{
        const validatedData = createRecipeSchema.parse(req.body);
        const recipe = await createRecipe(validatedData);
        return res.status(201).json({
            success: true,
            message: "Recipe created successfully",
            data: recipe,
        })
    } catch (err: any) {
        if (err.name === "ZodError") {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}


export async function getAllRecipesController(req: Request, res: Response) {
    try{
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10))
        const status = req.query.status as string | undefined
        const search = req.query.search as string | undefined;
        const allowedSortFields = ["title", "createdAt", "status"] as const;

        const sortBy = allowedSortFields.includes(
            req.query.sortBy as (typeof allowedSortFields)[number]
        )
            ? (req.query.sortBy as (typeof allowedSortFields)[number])
            : "createdAt";

        const order = req.query.order === "asc" ? "asc" : "desc";
        const { recipes, totalRecipes } = await getAllRecipes(page, limit, status, sortBy, order, search);
        return res.status(200).json({
            success: true,
            data: recipes,
            pagination: {
                currentPage: page,
                limit,
                totalRecipes,
                totalPages: Math.ceil(totalRecipes / limit),
                hasNextPage: page < Math.ceil(totalRecipes / limit),
                hasPreviousPage: page > 1
            }
        })
    } catch (err: any) {
        if (err.name === "ZodError") {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}


export async function getRecipeByIdController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid recipe id",
            });
        }
        const recipe = await getRecipeById(id);
        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: "Recipe not found",
            })
        }
        return res.status(200).json({
            success: true,
            data: recipe,
        })
    } catch (err: any) {
        if (err.name === "ZodError") {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}



export async function updateRecipeController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid recipe id",
        });
}
        const validatedData = updateRecipeSchema.parse(req.body);
        const recipe = await updateRecipe(id, validatedData);
        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: "Recipe not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Recipe updated successfully",
            data: recipe,
        });
    } catch (err: any) {
        if (err.name === "ZodError") {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}



export async function deleteRecipeController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid recipe id",
            })
        }
        const recipe = await deleteRecipe(id);
        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: "Recipe not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Recipe deleted successfully",
        })
    } catch (err: any) {
        if (err.name === "ZodError") {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
