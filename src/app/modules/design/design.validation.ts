import { z } from 'zod';
import { ComplexityLevel, DesignStatus } from './design.interface';

const designCoreSchema = z.object({
    title: z
        .string({ message: "Title is required" })
        .trim()
        .min(3, "Title must be at least 3 characters"),
    category: z
        .string({ message: "Category ID is required" })
        .length(24, "Category ID must be a 24-character hexadecimal string"),

    description: z
        .string({ message: "Description is required" })
        .trim()
        .min(10, "Description must be at least 10 characters"),
    previewImageUrl: z
        .string({ message: "Preview Image URL is required" })
        .url("Invalid URL format for preview image"),
    designerName: z
        .string({ message: "Designer Name is required" })
        .trim(),
    usedTools: z
        .array(z.string()
            .trim())
        .optional()
        .default([]),
    effectsUsed: z
        .array(z.string()
            .trim())
        .optional()
        .default([]),
    price: z
        .number({ message: "Price is required" })
        .min(0, "Price cannot be negative"),
    process: z.string().optional(),
    complexityLevel: z
        .nativeEnum(ComplexityLevel, { message: "Complexity Level is required" }),
    tags: z.array(z.string().trim()).optional().default([]),
    status: z.nativeEnum(DesignStatus).optional().default(DesignStatus.DRAFT),
    likesCount: z.number().int().min(0, "Likes count cannot be negative").optional(),
    downloadsCount: z.number().int().min(0, "Downloads count cannot be negative").optional(),

});

// --- Create Design Schema ---
export const createDesignZodSchema = z.object({
    body: designCoreSchema.strict()
});

// --- Update Design Schema ---
export const updateDesignZodSchema = z.object({
    body: designCoreSchema.partial().strict()
});


// --- Export for use in Routes ---
export const DesignValidation = {
    createDesignZodSchema,
    updateDesignZodSchema
};