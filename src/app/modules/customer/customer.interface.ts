import { Model } from 'mongoose';

export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  profileImg?: string;
  gender: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  isDeleted: boolean;
  orders?: string[];
};
export interface UserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<(TUser & Document) | null>;
}
