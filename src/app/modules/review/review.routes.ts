import { RequestHandler, Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { ReviewControllers } from "./review.controller";
import { ReviewValidation } from "./review.validation";

const router = Router();

router.get(
    '/design/:designId',
    ReviewControllers.getReviewsByDesign
);

// --- Protected Routes ---
router.post(
    '/',
    checkAuth(Role.ADMIN, Role.CUSTOMER),
    validateRequest(ReviewValidation.createReviewZodSchema),
    ReviewControllers.createReview as RequestHandler
);

router.get(
    '/all',
    checkAuth(Role.ADMIN),
    ReviewControllers.getAllReviews as RequestHandler
);

router.delete(
    '/:id',
    checkAuth(Role.ADMIN, Role.CUSTOMER),
    ReviewControllers.deleteReview as RequestHandler
);


export const ReviewRoutes = router;