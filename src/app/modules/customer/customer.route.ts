import express from 'express';
import { UserControllers } from './customer.controller';
//import { OrderControllers } from '../order/order.controller';

const router = express.Router();
//will call controller func
router.post('/create-user', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getSingleUser);
router.put('/:userId', UserControllers.updateUser);
router.delete('/:userId', UserControllers.deleteUser);
export const UserRoutes = router;
