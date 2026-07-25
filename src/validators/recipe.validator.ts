import { z } from "zod";

export const createRecipeSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters long")
        .max(100, "Title cannot exceed 100 characters"),

    ingredients: z.array(z.string().trim().min(1)).min(1, "At least one ingredient is required"),

    steps: z.array(z.string().trim().min(1)).min(1, "At least one step is required"),

    originalImage: z.string().url().optional(),

    processedImage: z.string().url().optional(),

    thumbnail: z.string().url().optional(),

    status: z.enum(["pending", "processing", "completed", "failed"]).optional(),
});

export const updateRecipeSchema = createRecipeSchema.partial();

export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeInput = z.infer<typeof updateRecipeSchema>;