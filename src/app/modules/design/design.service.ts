import httpStatus from 'http-status-codes';
import AppError from "../../errorHelpers/AppError";
import { IDesign } from './design.interface';
import { DesignModel } from './design.model';


const createDesign = async (payload: IDesign) => {
    const newDesign = await DesignModel.create(payload);
    return newDesign;
}

const getAllDesigns = async () => {
    const designs = await DesignModel.find({})
        .populate('category')
        .exec();

    const totalDesigns = await DesignModel.countDocuments();

    return {
        data: designs,
        meta: {
            total: totalDesigns
        }
    }
}

const getSingleDesign = async (designId: string) => {
    const design = await DesignModel.findById(designId)
        .populate('category')
        .exec();

    if (!design) {
        throw new AppError(httpStatus.NOT_FOUND, "Design Not Found");
    }

    return design;
}

const updateDesign = async (designId: string, payload: Partial<IDesign>) => {
    const isDesignExist = await DesignModel.findById(designId);

    if (!isDesignExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Design Not Found");
    }

    const updatedDesign = await DesignModel.findByIdAndUpdate(designId, payload, {
        new: true,
        runValidators: true
    })
        .populate('category')
        .exec();

    return updatedDesign;
}

const deleteDesign = async (designId: string): Promise<IDesign | null> => {
    const isDesignExist = await DesignModel.findById(designId);

    if (!isDesignExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Design Not Found");
    }

    const deletedDesign = await DesignModel.findByIdAndDelete(designId)
        .populate('category')
        .exec();

    return deletedDesign;
}


export const DesignServices = {
    createDesign,
    getAllDesigns,
    getSingleDesign,
    updateDesign,
    deleteDesign
}