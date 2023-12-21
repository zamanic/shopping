// order.controller.ts
import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import orderValidationSchema from './order.zod.validation';
import { User } from '../customer/customer.model';
import { Order } from './order.model';

const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;
    const userId = req.params.userId;
    const userIdNumber = Number(userId);

    await orderValidationSchema.orderValidationSchema.parse(orderData);
    const userE = await User.isUserExists(userIdNumber);

    if (!userE || !userE._id) {
      throw new Error('User not found');
    }
    await orderValidationSchema.objectIdSchema.parse(userE._id.toString());
    const newOrder = new Order({ ...orderData, userObjId: userE._id });
    await OrderServices.addOrderToUser(userIdNumber, newOrder);
    res.status(200).json({
      status: 'success',
      message: 'Order created successfully',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userIdNumber = Number(userId);
    const userE = await User.isUserExists(userIdNumber);
    if (!userE) {
      throw new Error('User not found');
    }
    const result = await OrderServices.getAllOrdersForUser(userIdNumber);

    const usersWithoutSensitiveData = result.map((userWithout) => {
      const userObj = userWithout.toObject();
      const userAny: any = userObj;
      delete userAny._id;
      delete userAny.userObjId;
      delete userAny.__v;
      return userAny;
    });

    res.status(200).json({
      status: 'success',
      message: 'Order fetched successfully!!',
      data: {
        orders: usersWithoutSensitiveData,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userIdNumber = Number(userId);
    const userE = await User.isUserExists(userIdNumber);
    if (!userE) {
      throw new Error('User not found');
    }
    const result = await OrderServices.calculateTotalPriceForUser(userIdNumber);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const OrderControllers = {
  addProductToOrder,
  getAllOrders,
  calculateTotalPrice,
};
