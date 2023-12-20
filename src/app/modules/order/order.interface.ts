// order.interface.ts
import { Model } from 'mongoose';
import { Schema } from 'mongoose';

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
  userObjId: Schema.Types.ObjectId; // Reference to the User collection
};

export interface OrderModel extends Model<TOrder> {
  isOrderExists(userId: number): Promise<TOrder | null>;
}
