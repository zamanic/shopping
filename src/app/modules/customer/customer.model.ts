import { Schema, model, Document, Query } from 'mongoose';
import { TAddress, TFullName, TUser, UserModel } from './customer.interface';
import bcrypt from 'bcrypt';
import validator from 'validator';
import config from '../../config';

const userFullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [30, 'Max allowed length is 30 char'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in Capitalize form',
    },
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [30, 'Max allowed length is 30 char'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const userAddressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Street is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
  },
});
const userSchema = new Schema<TUser, UserModel>(
  {
    userId: {
      type: Number,
      required: [true, 'User ID is required'],
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    fullName: {
      type: userFullNameSchema,
      required: [true, 'Full name is required'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
    },
    profileImg: {
      type: String,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is not valid',
      },
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not valid',
      },
    },
    isActive: {
      type: Boolean,
      required: [true, 'isActive is required'],
    },
    hobbies: {
      type: [String],
      required: [true, 'Hobbies are required'],
    },
    address: {
      type: userAddressSchema,
      required: [true, 'Address is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    orders: {
      type: [String],
      select: false,
      required: false,
    },
    // orders: [{ type: String, ref: 'Order' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

//virtual
userSchema.virtual('nameInFullForm').get(function () {
  //return this.fullName.firstName + this.fullName.lastName;
  return `${this.fullName.firstName} ${this.fullName.lastName}`;
});

// userSchema.pre('save', async function (next) {
//   //console.log(this, 'pre hook: we will save data');
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this;

//   // if (!user.orders) {
//   //   user.orders = [];
//   // }
//   //hashing password and save into DB
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });
userSchema.pre('save', async function (next) {
  //console.log(this, 'pre hook: we will save data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  // Hash the password only if it has been modified (or is new)
  if (user.isModified('password') && user.password) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

//customer.model.ts: post save middleware / hook
userSchema.post('save', function (doc, next) {
  //console.log(this, 'post hook: we saved our data');
  //doc.password = '';
  next();
});

//Query middleware
//pre hook for query middleware all find
userSchema.pre(/^find/, function (this: Query<TUser, Document>, next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
//Query for findOne
// userSchema.pre('findOne', function (next) {
//   this.findOne({ isDeleted: { $ne: true } });
//   next();
// });
//Query for aggregate: [ {$match: {isDeleted: {$ne : true}}}, { 'match': {id: '1'} } ]
userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

userSchema.statics.isUserExists = function (userId: number) {
  return this.findOne({ userId }); // Do not await here
};

export const User = model<TUser, UserModel>('User', userSchema);
