import { z } from "zod";

export const createRecipeSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters long")
        .max(100, "Title cannot exceed 100 characters"),

    description: z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters long"),

    imageUrl: z.string().optional(),

    processedImage: z.string().optional(),

    thumbnailImage: z.string().optional(),

    status: z.enum(["pending", "processing", "completed", "failed"]).optional(),
});

export const updateRecipeSchema = createRecipeSchema.partial();

export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeInput = z.infer<typeof updateRecipeSchema>;