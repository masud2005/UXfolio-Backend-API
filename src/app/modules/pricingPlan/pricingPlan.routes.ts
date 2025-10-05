import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { PricingPlanControllers } from "./pricingPlan.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createPricingPlanZodSchema, updatePricingPlanZodSchema } from "./pricingPlan.validation";

const router = Router();

router.get('/', PricingPlanControllers.getAllPlans);
router.get('/:id', PricingPlanControllers.getSinglePlan);

// Admin Only Routes
router.post('/', checkAuth(Role.ADMIN), validateRequest(createPricingPlanZodSchema), PricingPlanControllers.createPlan);
router.patch('/:id', checkAuth(Role.ADMIN), validateRequest(updatePricingPlanZodSchema), PricingPlanControllers.updatePlan);
router.delete('/:id', checkAuth(Role.ADMIN), PricingPlanControllers.deletePlan);

export const PricingPlanRoutes = router;