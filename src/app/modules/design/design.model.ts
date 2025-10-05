import { model, Schema } from "mongoose";
import { ComplexityLevel, DesignStatus, IDesign } from "./design.interface";

const designSchema = new Schema<IDesign>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    description: {
        type: String,
        required: true
    },
    previewImageUrl: {
        type: String,
        required: true
    },
    designerName: {
        type: String,
        required: true
    },
    usedTools: {
        type: [String],
        default: []
    },
    effectsUsed: {
        type: [String],
        default: []
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    process: {
        type: String
    },
    complexityLevel: {
        type: String,
        enum: Object.values(ComplexityLevel),
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: Object.values(DesignStatus),
        default: DesignStatus.DRAFT
    },
    likesCount: {
        type: Number,
        default: 0,
        min: 0
    },
    downloadsCount: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true,
    versionKey: false
});

export const DesignModel = model<IDesign>("Design", designSchema);