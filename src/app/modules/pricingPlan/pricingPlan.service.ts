import AppError from "../../errorHelpers/AppError";
import { IPricingPlan } from "./pricingPlan.interface";
import { PricingPlanModel } from "./pricingPlan.model";
import httpStatus from 'http-status-codes';

const createPlan = async (payload: IPricingPlan) => {
    const isExist = await PricingPlanModel.findOne({ name: payload.name });

    if (isExist) {
        throw new AppError(httpStatus.CONFLICT, "Pricing Plan already exists");
    }

    return await PricingPlanModel.create(payload);
}

const getAllPlans = async () => {
    const data = await PricingPlanModel.find({});
    const totalDocuments = await PricingPlanModel.countDocuments();

    return {
        data,
        meta: {
            total: totalDocuments
        }
    };
}

const getSinglePlan = async (id: string) => {
    const plan = await PricingPlanModel.findById(id);

    if (!plan) {
        throw new AppError(httpStatus.NOT_FOUND, "Pricing Plan Not Found");
    }

    return plan;
}

const updatePlan = async (id: string, payload: Partial<IPricingPlan>) => {
    const isExist = await PricingPlanModel.findById(id);

    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Pricing Plan Not Found");
    }

    const updatePlan = await PricingPlanModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

    return updatePlan
}

const deletePlan = async (id: string) => {
    const isExist = await PricingPlanModel.findById(id);

    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Pricing Plan Not Found");
    }

    const deletePlan = await PricingPlanModel.findByIdAndDelete(id);

    return deletePlan
}

export const PricingPlanServices = {
    createPlan,
    getAllPlans,
    getSinglePlan,
    updatePlan,
    deletePlan
};