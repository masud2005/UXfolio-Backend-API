import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";
import { envVars } from "../config/env";
import { UserModel } from "../modules/user/user.model";
import { IsActive } from "../modules/user/user.interface";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      // console.log(accessToken);

      if (!accessToken) {
        throw new AppError(403, "No token Received!");
      }

      const verifiedToken = jwt.verify(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;
      // console.log(verifiedToken)

      const isUserExist = await UserModel.findOne({
        email: verifiedToken.email,
      });

      if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
      }
      if (
        isUserExist.isActive === IsActive.BLOCKED ||
        isUserExist.isActive === IsActive.INACTIVE
      ) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `User is ${isUserExist.isActive}`
        );
      }
      if (isUserExist.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
      }
      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "You ar not permitted to view this route!!!");
      }

      req.user = verifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
  