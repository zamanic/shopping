import Joi from 'joi';
const fullNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(30)
    .regex(/^[A-Z][a-z]*$/, { name: 'capitalize' })
    .messages({
      'string.pattern.base': '"{#label}" must be in capitalize form',
    }),
  lastName: Joi.string()
    .required()
    .trim()
    .max(30)
    .regex(/^[a-zA-Z]+$/, { name: 'alpha' })
    .messages({
      'string.pattern.base':
        '"{#label}" must only contain alphabetic characters',
    }),
});

const addressValidationSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

// Define Joi schema for the main document
const userValidationSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required().strip(),
  fullName: fullNameValidationSchema.required(),
  age: Joi.number().required(),
  profileImg: Joi.string(),
  gender: Joi.string().valid('male', 'female'),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  email: Joi.string().email().required(),
  isActive: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string()).required(),
  address: addressValidationSchema.required(),
});

export default userValidationSchema;
