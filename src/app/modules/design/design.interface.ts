import { Types } from "mongoose";

export enum ComplexityLevel {
    BASIC = "Basic",
    INTERMEDIATE = "Intermediate",
    ADVANCED = "Advanced",
}

export enum DesignStatus {
    ACTIVE = "Active",
    DRAFT = "Draft",
    ARCHIVED = "Archived",
}

export interface IDesign {
    _id?: Types.ObjectId;
    title: string;
    description: string;
    previewImageUrl: string;
    price: number;
    process: string;
    category: Types.ObjectId;
    designerName: string;
    usedTools: string[];
    effectsUsed: string[];
    complexityLevel: ComplexityLevel;
    tags: string[];
    status: DesignStatus;
    likesCount: number;
    downloadsCount: number;
    createdAt?: Date;
    updatedAt?: Date;
}