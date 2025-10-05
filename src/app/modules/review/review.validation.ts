import { z } from 'zod';

// --- Core Review Schema ---
const reviewCoreSchema = z.object({
    design: z.string({ message: "Design ID is required" })
        .length(24, "Design ID must be a 24-character hexadecimal string"),

    rating: z.number({ message: "Rating is required" })
        .int("Rating must be an integer")
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot be more than 5"),

    comment: z.string().trim().min(5, "Comment must be at least 5 characters long").optional(),
});


// --- Create Review Schema ---
export const createReviewZodSchema = z.object({
    body: reviewCoreSchema.strict()
});

export const ReviewValidation = {
    createReviewZodSchema,
};