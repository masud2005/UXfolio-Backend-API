/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { DesignServices } from "./design.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsync";


const createDesign = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const design = await DesignServices.createDesign(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Design Created Successfully",
        data: design,
    })
})

const getAllDesigns = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await DesignServices.getAllDesigns();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All Designs Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
})

const getSingleDesign = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const designId = req.params.id;
    const result = await DesignServices.getSingleDesign(designId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single Design Retrieved Successfully",
        data: result
    })
})

const updateDesign = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const designId = req.params.id;
    const payload = req.body;

    const design = await DesignServices.updateDesign(designId, payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Design Updated Successfully",
        data: design
    })
})

const deleteDesign = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const designId = req.params.id;

    const design = await DesignServices.deleteDesign(designId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Design Deleted Successfully",
        data: design
    })
})


export const DesignControllers = {
    createDesign,
    getAllDesigns,
    getSingleDesign,
    updateDesign,
    deleteDesign
}