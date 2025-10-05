import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";


const router = Router();

router.post('/register', validateRequest(createUserZodSchema), UserControllers.createUser);
router.get('/all-users', UserControllers.getAllUsers);
router.get('/:id', UserControllers.getSingleUser);
router.patch('/:id', validateRequest(updateUserZodSchema), UserControllers.updateUser);
router.delete('/:id', UserControllers.deleteUser);


export const UserRoutes = router;