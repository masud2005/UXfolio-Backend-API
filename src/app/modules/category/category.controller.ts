/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { CategoryServices } from "./category.service";
import httpStatus from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


const createCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const category = await CategoryServices.createCategory(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Category Created Successfully",
        data: category,
    })
})

const getAllCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await CategoryServices.getAllCategories();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All Categories Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
})

const getSingleCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id;
    const result = await CategoryServices.getSingleCategory(categoryId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single Category Retrieved Successfully",
        data: result
    })
})

const updateCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id;
    const payload = req.body;

    const category = await CategoryServices.updateCategory(categoryId, payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category Updated Successfully",
        data: category
    })
})

const deleteCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id;

    const category = await CategoryServices.deleteCategory(categoryId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category Deleted Successfully",
        data: category
    })
})


export const CategoryControllers = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
}