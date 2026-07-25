import prisma from "../config/db.js";
import type {CreateRecipeInput, UpdateRecipeInput} from "../validators/recipe.validator.js";
import { imageQueue } from "../queues/image.queue.js";
import fs from "fs/promises";
import path from "path";


export async function createRecipe(data: CreateRecipeInput) {
    const recipe = await prisma.recipe.create({
        data,
    });
    if (recipe.imageUrl) {
        await imageQueue.add("process-image", {
            recipeId: recipe.id,
            imagePath: recipe.imageUrl,
            fileName: recipe.imageUrl
        })
    }
    return recipe;
}

export async function getAllRecipes(
    page: number,
    limit: number,
    status?: string,
    sortBy: string = "createdAt",
    order: "asc" | "desc" = "desc",
    search?: string
){
    const recipes = await prisma.recipe.findMany({
        where: {
            ...(status && { status }),
            ...(search && {
                title: {
                    contains: search,
                    mode: "insensitive",
                },
            }),
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
            [sortBy]: order
        }
    })
    const totalRecipes = await prisma.recipe.count({
        where: {
            ...(status && { status }),
            ...(search && {
                title: {
                    contains: search,
                    mode: "insensitive",
                },
            }),
        },
    })
    return {
        recipes,
        totalRecipes,
    };
}

export async function getRecipeById(id: number){
    return await prisma.recipe.findUnique({
        where: {
            id
        }
    })
}


export async function updateRecipe(id: number, data: UpdateRecipeInput) {
    const existingRecipe = await prisma.recipe.findUnique({
        where: {
            id,
        },
    })
    if (!existingRecipe) {
        return null
    }
    if (data.imageUrl && existingRecipe.imageUrl) {
        try {
            await fs.unlink(
                path.join(process.cwd(), "uploads", "originals", existingRecipe.imageUrl)
            );
        } catch (error) {
            console.error("Failed to delete original image:", error);
        }
    }
    if (existingRecipe.processedImage) {
        try {
            await fs.unlink(
                path.join(process.cwd(), existingRecipe.processedImage)
            );
        } catch (error) {
            console.error("Failed to delete processed image:", error);
        }
    }
    if (existingRecipe.thumbnailImage) {
        try {
            await fs.unlink(
                path.join(process.cwd(), existingRecipe.thumbnailImage)
            );
        } catch (error) {
            console.error("Failed to delete thumbnail image:", error);
        }
    }

    const updatedRecipe = await prisma.recipe.update({
        where: {
            id,
        },
        data: {
            ...data,
            processedImage: null,
            thumbnailImage: null,
            status: "pending",
        },
    })

    if (updatedRecipe.imageUrl) {
        await imageQueue.add("process-image", {
            recipeId: updatedRecipe.id,
            imagePath: updatedRecipe.imageUrl,
            fileName: updatedRecipe.imageUrl
        })
    }

    return updatedRecipe;
}



export async function deleteRecipe(id: number) {
    const recipe = await prisma.recipe.findUnique({
        where: {
            id,
        },
    })

    if (!recipe) {
        return null;
    }
    if (recipe.imageUrl) {
        try {
            await fs.unlink(
                path.join(process.cwd(), "uploads", "originals", recipe.imageUrl)
            )
        } catch (error) {
            console.error("Failed to delete original image:", error)
        }
    }
    if (recipe.processedImage) {
        try {
            await fs.unlink(path.join(process.cwd(), recipe.processedImage))
        } catch (error) {
            console.error("Failed to delete processed image:", error);
        }
    }
    if (recipe.thumbnailImage) {
        try {
            await fs.unlink(path.join(process.cwd(), recipe.thumbnailImage));
        } catch (error) {
            console.error("Failed to delete thumbnail image:", error);
        }
    }

    return await prisma.recipe.delete({
        where: {
            id,
        }
    })
}