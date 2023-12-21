import { Request, Response } from 'express';
import { User } from '../customer/customer.model';
import { Order } from '../order/order.model';

const getUsersWithOrders = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    const usersWithOrders = await Promise.all(
      users.map(async (user) => {
        const orders = await Order.find({ userObjId: user._id });
        const userObj = user.toObject();
        const ordersObj = orders.map((order) => {
          const orderObj = order.toObject();
          const orderAny: any = orderObj;
          delete orderAny._id;
          delete orderAny.__v;
          delete orderAny.userObjId;
          return orderAny;
        });

        const userAny: any = userObj;
        delete userAny.password;
        delete userAny.isDeleted;
        delete userAny.gender;
        delete userAny._id;
        delete userAny.__v;
        delete userAny.fullName._id;
        delete userAny.address._id;
        delete userAny.id;

        return {
          ...userObj,
          orders: ordersObj,
        };
      }),
    );

    res.status(200).json(usersWithOrders);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
};

export const HomeControllers = {
  getUsersWithOrders,
};
