import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(30)
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      { message: 'First name is not in capitalize form' },
    ),
  lastName: z
    .string()
    .min(1)
    .max(30)
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'Last name is not valid',
    }),
});

const addressValidationSchema = z.object({
  street: z.string().min(1, { message: 'Street is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
});

const userValidationSchema = z.object({
  userId: z.number().positive(),
  username: z.string().min(5),
  password: z.string().min(5),
  fullName: fullNameValidationSchema,
  age: z.number().positive(),
  profileImg: z.string().optional(),
  gender: z.enum(['male', 'female']),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()).min(1),
  address: addressValidationSchema,
  isDeleted: z.boolean(),
  orders: z.array(z.string()).optional(),
});

const fullNameValSchema = z.object({
  firstName: z
    .string()
    .max(30)
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      { message: 'First name is not in capitalize form' },
    )
    .optional(),
  lastName: z
    .string()
    .max(30)
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'Last name is not valid',
    })
    .optional(),
});

const addressValSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

const userValSchema = z.object({
  userId: z.number().positive().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  fullName: fullNameValSchema.optional(),
  age: z.number().positive().optional(),
  profileImg: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).optional(),
  address: addressValSchema.optional(),
  isDeleted: z.boolean().optional(),
  orders: z.array(z.string()).optional(),
});

export default { userValidationSchema, userValSchema };
