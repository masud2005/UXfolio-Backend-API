import { Router } from "express";
import { UserControllers } from "./user.controller";


const router = Router();

router.post('/register', UserControllers.createUser);
router.get('/all-users', UserControllers.getAllUsers);
router.get('/:id', UserControllers.getSingleUser);
router.patch('/:id', UserControllers.updateUser);
router.delete('/:id', UserControllers.deleteUser);


export const UserRoutes = router;