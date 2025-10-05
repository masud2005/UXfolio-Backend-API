import { model, Schema } from "mongoose";
import { IPurchase, PaymentStatus } from "./purchase.interface";

const purchaseSchema = new Schema<IPurchase>({
    customer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    design: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Design'
    },
    selectedPricingPlan: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'PricingPlan'
    },
    paymentStatus: {
        type: String,
        enum: Object.values(PaymentStatus),
        default: PaymentStatus.PENDING
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

export const PurchaseModel = model<IPurchase>("Purchase", purchaseSchema);