import express from 'express';
//import { UserControllers } from './customer.controller';
import { OrderControllers } from './order.controller';

const router = express.Router();
//will call controller func
router.put('/:userId/orders', OrderControllers.addProductToOrder);
router.get('/:userId/orders', OrderControllers.getAllOrders);
router.get('/:userId/orders/total-price', OrderControllers.calculateTotalPrice);
export const OrderRoutes = router;
