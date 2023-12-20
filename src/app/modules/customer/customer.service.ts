import { TUser } from './customer.interface';
import { User } from './customer.model';

//creating a Static Method:
const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }
  const result = await User.create(userData);
  return result;
};

//Creating a Custom Instance Method:
//by implementing a custom instance method instead of above code:
// const createUserIntoDB = async (userData: TUser) => {
//   const user = new User(userData);
//   if (await user.isUserExists(userData.userId)) {
//     throw new Error('User already exists');
//   }
//   const result = await user.save();
//   return result;
// };

//const getAllUsersFromDB = async () => {
const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

//const getSingleUserFromDB = async (userId: number) => {
const getSingleUserFromDB = async (userId: number): Promise<TUser | null> => {
  //you can use findOne:
  //const result = await User.findOne({ userId });
  const userW = await User.isUserExists(userId);
  if (!userW) {
    throw new Error('User not found');
  }
  //or you can use aggregate:
  //const result = await User.aggregate([{ $match: { userId: userId } }]);
  const result = await User.findById(userW._id);
  // const resultObj = result?.toObject;
  // console.log(resultObj);
  return result;
};
//const deleteSingleUserFromDB = async (userId: number) => {
const deleteSingleUserFromDB = async (
  userId: number,
): Promise<TUser | null> => {
  const userW = await User.isUserExists(userId);
  if (!userW) {
    throw new Error('User not found');
  }
  const result = await User.findByIdAndDelete(userW._id);
  //const result = await User.findByIdAndDelete(userId);

  return result;
};

//const updateUserInDB = async (userId: number, updatedUserData: TUser) => {
const updateUserInDB = async (
  userId: number,
  updatedUserData: TUser,
): Promise<TUser | null> => {
  // Check if the user exists
  const existingUser = await User.isUserExists(userId);
  if (!existingUser) {
    throw new Error('User not found');
  }
  const result = await User.findByIdAndUpdate(existingUser, updatedUserData, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
  updateUserInDB,
};
