import { Types } from "mongoose";

export enum PaymentStatus {
    PENDING = "Pending",
    PAID = "Paid",
    CANCELLED = "Cancelled"
}

export interface IPurchase {
    _id?: Types.ObjectId;
    customer: Types.ObjectId;
    design: Types.ObjectId;
    selectedPricingPlan: Types.ObjectId;
    paymentStatus: PaymentStatus;
    purchaseDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}