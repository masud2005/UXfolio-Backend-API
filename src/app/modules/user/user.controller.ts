/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import httpStatus from 'http-status-codes';
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";


const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
})

const getSingleUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const result = await UserServices.getSingleUser(userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single User Retrieved Successfully",
        data: result
    })
})

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User create successfully",
        data: user,
    })
})

const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const payload = req.body;
    // console.log(userId, payload);

    const user = await UserServices.updateUser(userId, payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Updated Successfully",
        data: user
    })
})

const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    const user = await UserServices.deleteUser(userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Deleted Successfully",
        data: user
    })
})


export const UserControllers = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
}