import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as bcrypt from 'bcrypt';

import User from '../models/User';
import { IUser, User as UserType } from '../types';

// register a user
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Please provide valid credentials' });
  }

  const userExist: UserType | null = await User.findOne({ email });

  if (userExist) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user: UserType = await User.create({ username, email, password: hashPassword });
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message})
    }
  }
};

// login a user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const user: UserType | null = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: 'Incorrect email'});
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({ error: 'Invalid credentials'});
  }

  res.status(200).json({ user });
};

// get user
export const getLoggedInUserData = asyncHandler(async (req: Request, res: Response) => {
  // const user = User
  res.status(200).json({ message: 'get user data' });
});