import { model, Schema } from "mongoose";
import { IReview } from "./review.interface";

const reviewSchema = new Schema<IReview>({
    reviewer: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    design: { type: Schema.Types.ObjectId, required: true, ref: 'Design' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true }
}, {
    timestamps: true,
    versionKey: false
});

export const ReviewModel = model<IReview>("Review", reviewSchema);