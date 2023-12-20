// order.zod.validation.ts
import { z } from 'zod';

const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
  // user: z.string().refine((val) => /^[a-f\d]{24}$/i.test(val), {
  //   message: 'Invalid ObjectId format',
  // }),
  //userObjId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format'),
});
const objectIdSchema = z.string().refine(
  (value) => {
    return /^[0-9a-fA-F]{24}$/.test(value);
  },
  {
    message: 'Invalid ObjectId', // Custom error message
  },
);
// const userOrderSchema = z.array(objectIdSchema);
export default { objectIdSchema, orderValidationSchema };

// import { z } from 'zod';

// const orderValidationSchema = z.object({
//   productName: z.string().min(1, 'Product name is required'),
//   price: z.number().positive('Price must be a positive number'),
//   quantity: z.number().positive('Quantity must be a positive number'),
//   user: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format'),
// });

//export default orderValidationSchema;
