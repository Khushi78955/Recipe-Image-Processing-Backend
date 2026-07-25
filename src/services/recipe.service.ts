import prisma from "../config/db.js";
import type {CreateRecipeInput, UpdateRecipeInput} from "../validators/recipe.validator.js";
import { imageQueue } from "../queues/image.queue.js";

export async function createRecipe(data: CreateRecipeInput) {
    const recipe = await prisma.recipe.create({
        data,
    });
    if (recipe.imageUrl) {
        await imageQueue.add("process-image", {
            recipeId: recipe.id,
            imagePath: recipe.imageUrl,
            fileName: recipe.imageUrl,
        });
    }
    return recipe;
}

export async function getAllRecipes(){
    return await prisma.recipe.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
}

export async function getRecipeById(id: number){
    return await prisma.recipe.findUnique({
        where: {
            id
        }
    })
}


export async function updateRecipe(id: number, data: UpdateRecipeInput){
    return await prisma.recipe.update({
        where: {
            id
        },
        data
    })
}


export async function deleteRecipe(id: number){
    return await prisma.recipe.delete({
        where: {
            id
        }
    })
}