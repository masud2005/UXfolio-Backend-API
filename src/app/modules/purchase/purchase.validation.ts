import { z } from 'zod';

const purchaseCoreSchema = z.object({
    design: z.string({ message: "Design ID is required" })
        .length(24, "Design ID must be a 24-character hexadecimal string"),

    selectedPricingPlan: z.string({ message: "Pricing Plan ID is required" })
        .length(24, "Pricing Plan ID must be a 24-character hexadecimal string"),
});


export const createPurchaseZodSchema = z.object({
    body: purchaseCoreSchema.strict()
});

export const PurchaseValidation = {
    createPurchaseZodSchema,
};