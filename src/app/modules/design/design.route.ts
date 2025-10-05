import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { DesignControllers } from "./design.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createDesignZodSchema, updateDesignZodSchema } from "./design.validation";


const router = Router();

router.get('/', DesignControllers.getAllDesigns);
router.get('/:id', DesignControllers.getSingleDesign);

// --- Admin Only Routes ---
router.post('/', checkAuth(Role.ADMIN), validateRequest(createDesignZodSchema), DesignControllers.createDesign);
router.patch('/:id', checkAuth(Role.ADMIN), validateRequest(updateDesignZodSchema), DesignControllers.updateDesign);
router.delete('/:id', checkAuth(Role.ADMIN), DesignControllers.deleteDesign);

export const DesignRoutes = router;