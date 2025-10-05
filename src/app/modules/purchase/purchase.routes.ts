import { RequestHandler, Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { PurchaseControllers } from "./purchase.controller";
import { PurchaseValidation } from "./purchase.validation";


const router = Router();

// --- Customer Routes ---

router.post(
    '/',
    checkAuth(Role.ADMIN, Role.CUSTOMER),
    validateRequest(PurchaseValidation.createPurchaseZodSchema),
    PurchaseControllers.createPurchase as RequestHandler
);

router.get(
    '/my-purchases',
    checkAuth(Role.CUSTOMER),
    PurchaseControllers.getUserPurchases as RequestHandler
);


// --- Admin Routes ---

router.get(
    '/',
    checkAuth(Role.ADMIN),
    PurchaseControllers.getAllPurchases
);

router.patch(
    '/:id/status',
    checkAuth(Role.ADMIN),
    PurchaseControllers.updatePaymentStatus
);


export const PurchaseRoutes = router;