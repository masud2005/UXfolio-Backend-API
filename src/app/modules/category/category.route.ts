import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { CategoryControllers } from "./category.controller";
import { createCategoryZodSchema, updateCategoryZodSchema } from "./category.validation";


const router = Router();
router.get('/', CategoryControllers.getAllCategories);
router.get('/:id', CategoryControllers.getSingleCategory);

// --- Admin Only Routes ---
router.post('/', checkAuth(Role.ADMIN), validateRequest(createCategoryZodSchema), CategoryControllers.createCategory);
router.patch('/:id', checkAuth(Role.ADMIN), validateRequest(updateCategoryZodSchema), CategoryControllers.updateCategory);
router.delete('/:id', checkAuth(Role.ADMIN), CategoryControllers.deleteCategory);

export const CategoryRoutes = router;