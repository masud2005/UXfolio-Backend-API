// review.service.ts
import { ReviewModel } from "./review.model";
import httpStatus from 'http-status-codes';
import AppError from "../../errorHelpers/AppError";
import { IReview } from "./review.interface";
import { Types } from "mongoose";
import { Role } from "../user/user.interface";

const createReview = async (reviewerId: Types.ObjectId, payload: Partial<IReview>) => {
    const isReviewed = await ReviewModel.findOne({ reviewer: reviewerId, design: payload.design });

    if (isReviewed) {
        throw new AppError(httpStatus.BAD_REQUEST, "You have already reviewed this design");
    }
    const review = await ReviewModel.create({ ...payload, reviewer: reviewerId });
    return review;
}

const getAllReviews = async () => {
    const data = await ReviewModel.find({})
        .populate('reviewer', 'name email')
        .populate('design', 'title previewImageUrl');

    return {
        data,
        meta: {
            total: data.length
        }
    };
}

const getReviewsByDesign = async (designId: string) => {
    const reviews = await ReviewModel.find({ design: designId })
        .populate('reviewer', 'name picture')
        .select('-updatedAt');

    return reviews;
}

const deleteReview = async (reviewId: string, role: string, userId: Types.ObjectId) => {
    const review = await ReviewModel.findById(reviewId);
    if (!review) throw new AppError(httpStatus.NOT_FOUND, "Review Not Found");

    if (role !== Role.ADMIN && review.reviewer.toString() !== userId.toString()) {
        throw new AppError(httpStatus.FORBIDDEN, "You are not authorized to delete this review");
    }

    return await ReviewModel.findByIdAndDelete(reviewId);
}


export const ReviewServices = {
    createReview,
    getAllReviews,
    getReviewsByDesign,
    deleteReview
};