// order.service.ts
import { User } from '../customer/customer.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import mongoose from 'mongoose';

//const addOrderToUser = async (userId: number, orderData: Omit<TOrder, 'userObjId'>) => {
const addOrderToUser = async (userId: number, orderData: TOrder) => {
  // Find the user by ID
  const userW = await User.isUserExists(userId);
  if (!userW) {
    throw new Error('User not found');
  }

  const newOrder = new Order(orderData);
  await newOrder.save();
  const userOrder = await User.findOne({ userId }).select('+orders');
  if (!userOrder || !userOrder.orders) {
    throw new Error('User not found');
  }
  userOrder.orders.push(newOrder._id.toString());
  await userOrder.save();
  return newOrder;
};

const getAllOrdersForUser = async (userId: number) => {
  const user = await User.isUserExists(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const userOrder = await User.findOne({ userId }).select('+orders');
  if (!userOrder || !userOrder.orders) {
    return [];
  }

  // Convert string IDs to ObjectId
  const orderIds = userOrder.orders.map(
    (id) => new mongoose.Types.ObjectId(id),
  );

  // Fetch orders from the Order collection
  const orders = await Order.find({ _id: { $in: orderIds } });
  return orders;
};

const calculateTotalPriceForUser = async (userId: number) => {
  const user = await User.isUserExists(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const userOrder = await User.findOne({ userId }).select('+orders');
  if (!userOrder || !userOrder.orders) {
    return 0; // Return 0 if there are no orders
  }

  // Fetch actual order objects from the Order collection
  const orderObjects = await Order.find({ _id: { $in: userOrder.orders } });

  // Calculate the total price
  const totalPrice = orderObjects.reduce((sum, order) => {
    return sum + order.price * order.quantity;
  }, 0);

  return totalPrice;
};

export const OrderServices = {
  addOrderToUser,
  getAllOrdersForUser,
  calculateTotalPriceForUser,
};
