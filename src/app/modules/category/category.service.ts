import AppError from "../../errorHelpers/AppError";
import httpStatus from 'http-status-codes';
import { CategoryModel } from "./category.model";
import { ICategory } from "./category.interface";


const createCategory = async (payload: ICategory) => {
    const isExist = await CategoryModel.findOne({ name: payload.name });

    if (isExist) {
        throw new AppError(httpStatus.CONFLICT, "Category already exists");
    }

    const newCategory = await CategoryModel.create(payload);
    return newCategory;
}

const getAllCategories = async () => {
    const categories = await CategoryModel.find({});
    const totalCategories = await CategoryModel.countDocuments();

    return {
        data: categories,
        meta: {
            total: totalCategories
        }
    }
}

const getSingleCategory = async (categoryId: string) => {
    const category = await CategoryModel.findById(categoryId);

    if (!category) {
        throw new AppError(httpStatus.NOT_FOUND, "Category Not Found");
    }

    return category;
}

const updateCategory = async (categoryId: string, payload: Partial<ICategory>) => {
    const isCategoryExist = await CategoryModel.findById(categoryId);

    if (!isCategoryExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Category Not Found");
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(categoryId, payload, {
        new: true,
        runValidators: true
    });

    return updatedCategory;
}

const deleteCategory = async (categoryId: string) => {
    const isCategoryExist = await CategoryModel.findById(categoryId);

    if (!isCategoryExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Category Not Found");
    }

    const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);

    return deletedCategory;
}


export const CategoryServices = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
}