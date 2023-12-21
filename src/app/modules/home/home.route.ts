import express from 'express';
import { HomeControllers } from './home.controller';

const router = express.Router();

// In your customer.route.ts or a new route file
router.get('/', HomeControllers.getUsersWithOrders);

export const HomeRoutes = router;
