import User from '../models/user.schema';
import asyncHandler from '../services/asyncHndler';
import CustomError from '../utils/customError';
import cookieOptions from '../utils/cookieOptions';

/**********************************************************
 * @SIGNUP
 * @route http://localhost:4000/api/auth/signup
 * @description User controller signup for creating new user
 * @parameters name email and password
 * @returns User object
 **********************************************************/

export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new CustomError('Plase Fill all details', 400);
  }

  //   Check if user exists
  const existingUser = User.findOne({ email });

  if (existingUser) {
    throw new CustomError('User already exists', 400);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = user.getJwtToken();
  console.log(user);
  user.password = undefined;

  res.cookie('token', token, cookieOptions);

  res.statu(200).json({
    success: true,
    token,
    user,
  });
});
