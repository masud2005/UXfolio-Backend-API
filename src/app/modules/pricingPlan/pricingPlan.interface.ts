import { Types } from "mongoose";

export interface IPricingPlan {
    _id?: Types.ObjectId;
    name: "Basic" | "Standard" | "Premium" | string;
    price: number;
    features: string[];
    duration: string;
}