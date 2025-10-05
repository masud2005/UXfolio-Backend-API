/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { ReviewServices } from "./review.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsync";
import { Types } from "mongoose";

type AuthRequest = Request & {
    user?: {
        userId: string;
        role: string;
    }
};


const createReview = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!;
        const review = await ReviewServices.createReview(new Types.ObjectId(userId), req.body);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Review Added Successfully",
            data: review,
        })
    } catch (error) {
        next(error)
    }
};

const getAllReviews = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const result = await ReviewServices.getAllReviews();

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "All Reviews Retrieved Successfully",
            data: result.data,
            meta: result.meta
        })
    } catch (error) {
        next(error)
    }
};

const getReviewsByDesign = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const designId = req.params.designId;

    const result = await ReviewServices.getReviewsByDesign(designId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Reviews Retrieved for the Design",
        data: result,
    })
});

const deleteReview = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const reviewId = req.params.id;
        const { role, userId } = req.user!;

        const review = await ReviewServices.deleteReview(reviewId, role, new Types.ObjectId(userId));

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Review Deleted Successfully",
            data: review
        })
    } catch (error) {
        next(error)
    }
};


export const ReviewControllers = {
    createReview,
    getAllReviews,
    getReviewsByDesign,
    deleteReview
}