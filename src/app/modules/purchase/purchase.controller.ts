/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { PurchaseServices } from "./purchase.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsync";
import { Types } from "mongoose";
import { PaymentStatus } from "./purchase.interface";

type AuthRequest = Request & {
    user?: {
        userId: string;
        role: string;
    }
};

const createPurchase = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!;

        const purchase = await PurchaseServices.createPurchase(new Types.ObjectId(userId), req.body);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Purchase Initiated Successfully (Payment Pending)",
            data: purchase,
        })
    } catch (error) {
        next(error)
    }
};

const getUserPurchases = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!;

        const purchases = await PurchaseServices.getUserPurchases(new Types.ObjectId(userId));

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Your Purchase History Retrieved Successfully",
            data: purchases,
        })
    } catch (error) {
        next(error)
    }
};


const getAllPurchases = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await PurchaseServices.getAllPurchases();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All Purchase Orders Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
});

const updatePaymentStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const purchaseId = req.params.id;
    const { status } = req.body;

    if (!Object.values(PaymentStatus).includes(status)) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            message: "Invalid payment status provided",
            data: null
        })
    }

    const updatedPurchase = await PurchaseServices.updatePaymentStatus(purchaseId, status);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment Status Updated Successfully",
        data: updatedPurchase
    })
});


export const PurchaseControllers = {
    createPurchase,
    getAllPurchases,
    getUserPurchases,
    updatePaymentStatus,
}