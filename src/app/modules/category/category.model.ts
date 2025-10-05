import { model, Schema } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
}, {
    timestamps: true,
    versionKey: false
});

export const CategoryModel = model<ICategory>("Category", categorySchema);