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
    } catch(err: any){
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}


export async function getAllRecipesController(req: Request, res: Response) {
    try{
        const recipes = await getAllRecipes();
        return res.status(200).json({
            success: true,
            data: recipes,
        });
    } catch(err: any){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}


export async function getRecipeByIdController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
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
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}



export async function updateRecipeController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const validatedData = updateRecipeSchema.parse(req.body);
        const recipe = await updateRecipe(id, validatedData);
        return res.status(200).json({
            success: true,
            message: "Recipe updated successfully",
            data: recipe,
        });
    } catch (err: any) {
        return res.status(400).json({
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
        await deleteRecipe(id);
        return res.status(200).json({
            success: true,
            message: "Recipe deleted successfully",
        })
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}
