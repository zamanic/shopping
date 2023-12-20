// import { Schema, model, Document } from 'mongoose';
// import { TOrder } from './order.interface';

// const orderSchema = new Schema<TOrder & Document>({
//   productName: {
//     type: String,
//     required: [true, 'Product name is required'],
//   },
//   price: {
//     type: Number,
//     required: [true, 'Price is required'],
//   },
//   quantity: {
//     type: Number,
//     required: [true, 'Quantity is required'],
//   },
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: [true, 'Please tell your user'],
//   },
// });

// export const Order = model<TOrder & Document>('Order', orderSchema);
import { Schema, model, Document } from 'mongoose';
import { TOrder, OrderModel } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
    },
    userObjId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  // {
  //   toJSON: { virtuals : true},
  //   toObject: { virtuals : true }
  // }
);
// orderSchema.virtual('userObjId').get(function(){
//   return this.user;
// })
orderSchema.statics.isOrderExists = async function (userId: number) {
  // Implementation of checking if an order exists
};
orderSchema.pre('save', async function (next) {
  //console.log(this, 'pre hook: we will save data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const order = this;
  //hashing password and save into DB

  next();
});

//customer.model.ts: post save middleware / hook
orderSchema.post('save', function (doc, next) {
  //console.log(this, 'post hook: we saved our data');
  next();
});

export const Order = model<TOrder, OrderModel>('Order', orderSchema);
