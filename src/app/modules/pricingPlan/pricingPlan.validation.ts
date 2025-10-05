import { z } from 'zod';

// --- Core Pricing Plan Schema ---
const pricingPlanCoreSchema = z.object({
    name: z
        .string({ message: "Plan Name is required" })
        .trim()
        .min(2, "Name must be at least 2 characters"),
    price: z
        .number({ message: "Price is required" })
        .min(0, "Price cannot be negative"),
    features: z
        .array(z.string().trim().min(1, "Feature description cannot be empty"))
        .min(1, "At least one feature must be listed"),
    duration: z
        .string({ message: "Duration is required" })
        .trim()
        .min(3, "Duration must be descriptive (e.g., Monthly, Yearly)"),
});

// --- Create Pricing Plan Schema ---
export const createPricingPlanZodSchema = z.object({
    body: pricingPlanCoreSchema.strict()
});

// --- Update Pricing Plan Schema ---
export const updatePricingPlanZodSchema = z.object({
    body: pricingPlanCoreSchema.partial().strict()
});


export const PricingPlanValidation = {
    createPricingPlanZodSchema,
    updatePricingPlanZodSchema
};