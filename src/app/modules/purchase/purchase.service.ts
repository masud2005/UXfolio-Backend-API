import { PurchaseModel } from "./purchase.model";
import httpStatus from 'http-status-codes';
import AppError from "../../errorHelpers/AppError";
import { Types } from "mongoose";
import { IPurchase, PaymentStatus } from "./purchase.interface";

const createPurchase = async (customerId: Types.ObjectId, payload: Partial<IPurchase>) => {

    const purchase = await PurchaseModel.create({
        ...payload,
        customer: customerId,
        paymentStatus: PaymentStatus.PENDING
    });
    return purchase;
}

const getAllPurchases = async () => {
    const data = await PurchaseModel.find({})
        .populate('customer', 'name email phone')
        .populate('design', 'title price')
        .populate('selectedPricingPlan', 'name price');

    return { data, meta: { total: data.length } };
}

const getUserPurchases = async (userId: Types.ObjectId) => {
    const data = await PurchaseModel.find({ customer: userId })
        .populate('design', 'title price previewImageUrl')
        .populate('selectedPricingPlan', 'name price duration');

    return data;
}

const updatePaymentStatus = async (purchaseId: string, status: PaymentStatus) => {
    const purchase = await PurchaseModel.findById(purchaseId);
    if (!purchase) throw new AppError(httpStatus.NOT_FOUND, "Purchase Record Not Found");

    const updatedPurchase = await PurchaseModel.findByIdAndUpdate(
        purchaseId,
        { paymentStatus: status },
        { new: true }
    );

    return updatedPurchase;
}


export const PurchaseServices = {
    createPurchase,
    getAllPurchases,
    getUserPurchases,
    updatePaymentStatus
};