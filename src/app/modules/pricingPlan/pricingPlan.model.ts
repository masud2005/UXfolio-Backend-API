import { model, Schema } from "mongoose";
import { IPricingPlan } from "./pricingPlan.interface";

const pricingPlanSchema = new Schema<IPricingPlan>({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    features: { type: [String], default: [] },
    duration: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
});

export const PricingPlanModel = model<IPricingPlan>("PricingPlan", pricingPlanSchema);