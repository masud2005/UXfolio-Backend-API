import { envVars } from "../../config/env";
import { UserModel } from "./user.model";
import httpStatus from 'http-status-codes';
import bcrypt from 'bcrypt';
import { IAuthProvider, IUser } from "./user.interface";
import AppError from "../../errorHelpers/AppError";


const getAllUsers = async () => {
    const users = await UserModel.find({});
    const totalUsers = await UserModel.countDocuments();

    return {
        data: users,
        meta: {
            total: totalUsers
        }
    }
}

const getSingleUser = async (userId: string) => {
    const user = await UserModel.findById(userId);

    return {
        data: user
    }
}

const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    const isUserExist = await UserModel.findOne({ email });

    if (isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist")
    }

    const hashedPassword = await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND));
    // console.log(hashPassword);

    const authProvider: IAuthProvider = {
        provider: "credentials",
        providerId: email as string
    }

    const user = await UserModel.create({
        email,
        password: hashedPassword,
        ...rest,
        auths: [authProvider]
    })

    return user;
}

const updateUser = async (userId: string, payload: Partial<IUser>) => {
    const isUserExist = await UserModel.findById(userId);

    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
    }

    if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, Number(envVars.BCRYPT_SALT_ROUND));
    }

    const newUpdateUser = await UserModel.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });

    return newUpdateUser;
}

const deleteUser = async (userId: string) => {
    const isUserExist = await UserModel.findById(userId);

    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
    }

    const deleteUser = await UserModel.findByIdAndDelete(userId, { new: true, runValidators: true });

    return deleteUser;
}


export const UserServices = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
}