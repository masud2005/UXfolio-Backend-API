import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";


const router = Router();

router.post('/register', validateRequest(createUserZodSchema), UserControllers.createUser);
router.get('/all-users', checkAuth(Role.ADMIN), UserControllers.getAllUsers);
router.get('/:id', checkAuth(...Object.values(Role)), UserControllers.getSingleUser);
router.patch('/:id', checkAuth(...Object.values(Role)), validateRequest(updateUserZodSchema), UserControllers.updateUser);
router.delete('/:id', checkAuth(Role.ADMIN), UserControllers.deleteUser);


export const UserRoutes = router;