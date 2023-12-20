import { Request, Response } from 'express';
import { UserServices } from './customer.service';
import userValidationSchema from './customer.zod.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    //data validation using Joi
    //const { error, value } = userValidationSchema.validate(userData);
    // console.log('Received User Data:', userData);
    //data validation using Zod
    const zodParsedData =
      userValidationSchema.userValidationSchema.parse(userData);
    const result = await UserServices.createUserIntoDB(zodParsedData);
    //const { password, ...userWithoutPassword } = result;
    //console.log(userWithoutPassword);

    // Convert the Mongoose document to a plain JavaScript object
    const userWithoutPassword = result.toObject();

    // Exclude the password field from the response data
    delete userWithoutPassword.password;
    delete userWithoutPassword.isDeleted;
    delete userWithoutPassword.gender;
    delete userWithoutPassword._id;
    delete userWithoutPassword.__v;
    delete userWithoutPassword.orders;
    delete userWithoutPassword.fullName._id;
    delete userWithoutPassword.address._id;

    // Send the response with the modified data
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: userWithoutPassword,
    });
  } catch (err: any) {
    // Handle errors appropriately
    res.status(500).json({
      status: 'fail',
      message: err.message || 'Something went wrong',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    // Map over the array and modify each user
    const usersWithoutSensitiveData = result.map((userWithout) => {
      const userObj = userWithout.toObject();
      delete userObj.userId;
      delete userObj.password;
      delete userObj.isDeleted;
      delete userObj.isActive;
      delete userObj.hobbies;
      delete userObj.gender;
      delete userObj._id;
      delete userObj.__v;
      delete userObj.orders;
      delete userObj.fullName._id;
      delete userObj.address._id;
      return userObj;
    });

    res.status(200).json({
      success: true,
      message: 'Users are retrieved successfully',
      data: usersWithoutSensitiveData,
    });
  } catch (err: any) {
    // Handle errors appropriately
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

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNumber = Number(userId);

    if (isNaN(userIdNumber)) {
      res.status(400).json({
        success: false,
        message: 'Invalid userId. It should be a number.',
      });
      return;
    }
    const result = await UserServices.getSingleUserFromDB(userIdNumber);
    // Omit the password field from the response

    const userWithoutPassword = result.toObject();

    // Exclude the password field from the response data
    delete userWithoutPassword.password;
    delete userWithoutPassword.isDeleted;
    delete userWithoutPassword.gender;
    delete userWithoutPassword._id;
    delete userWithoutPassword.__v;
    delete userWithoutPassword.orders;
    delete userWithoutPassword.fullName._id;
    delete userWithoutPassword.address._id;

    //delete userWithoutPassword._id;
    res.status(200).json({
      success: true,
      message: 'User is retrieved successfully',
      data: userWithoutPassword,
    });
  } catch (err: any) {
    // Handle errors appropriately
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

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNumber = Number(userId);
    if (isNaN(userIdNumber)) {
      res.status(400).json({
        success: false,
        message: 'Invalid userId. It should be a number.',
      });
      return;
    }
    await UserServices.deleteSingleUserFromDB(userIdNumber);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (err: any) {
    // Handle errors appropriately
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

const updateUser = async (req: Request, res: Response) => {
  try {
    // const { userId } = req.params;
    // const userIdNumber = Number(userId);
    const { user: updatedUserData } = req.body;
    userValidationSchema.userValSchema.parse(updatedUserData);

    const userId = req.params.userId;
    const userIdNumber = Number(userId);
    const result = await UserServices.updateUserInDB(
      userIdNumber,
      updatedUserData,
    );
    // Omit the password field from the response
    const userWithoutPassword = result.toObject();
    delete userWithoutPassword.password;
    delete userWithoutPassword.isDeleted;
    delete userWithoutPassword.gender;
    delete userWithoutPassword._id;
    delete userWithoutPassword.__v;
    delete userWithoutPassword.orders;
    delete userWithoutPassword.fullName._id;
    delete userWithoutPassword.address._id;

    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: userWithoutPassword,
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'fail',
      message: err.message || 'Something went wrong',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
