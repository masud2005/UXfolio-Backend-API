import { Types } from "mongoose";

export interface ICategory {
    _id?: Types.ObjectId;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}