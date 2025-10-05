/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { PricingPlanServices } from "./pricingPlan.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsync";


const createPlan = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const plan = await PricingPlanServices.createPlan(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Pricing Plan Created Successfully",
        data: plan,
    })
})

const updatePlan = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const planId = req.params.id;
    const payload = req.body;

    const plan = await PricingPlanServices.updatePlan(planId, payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Pricing Plan Updated Successfully",
        data: plan
    })
})

const deletePlan = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const planId = req.params.id;

    const plan = await PricingPlanServices.deletePlan(planId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Pricing Plan Deleted Successfully",
        data: plan
    })
})


const getAllPlans = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await PricingPlanServices.getAllPlans();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All Pricing Plans Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
})

const getSinglePlan = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const planId = req.params.id;
    const result = await PricingPlanServices.getSinglePlan(planId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single Pricing Plan Retrieved Successfully",
        data: result
    })
})


export const PricingPlanControllers = {
    createPlan,
    getAllPlans,
    getSinglePlan,
    updatePlan,
    deletePlan
}