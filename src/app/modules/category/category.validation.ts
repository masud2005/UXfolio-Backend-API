import { z } from 'zod';

const categorySchema = z.object({
    name: z
        .string({ message: "Category name is required" })
        .trim()
        .min(2, "Name must be at least 2 characters"),
});

export const createCategoryZodSchema = z.object({
    body: categorySchema.strict()
});

export const updateCategoryZodSchema = z.object({
    body: categorySchema.partial().strict()
});