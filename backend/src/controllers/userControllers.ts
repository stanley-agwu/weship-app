import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import { ILoginData, IRegisterData, UIUser, User as UserType } from '../types';

// generate JWT token function
const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
};

// register a user
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password }: IRegisterData = req.body;

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
    const token = createToken(user._id);
    const userData: UIUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token,
    };
    return res.status(200).json({ user: userData });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return null;
  }
};

// login a user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password }: ILoginData = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const user: UserType | null = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: 'Incorrect email' });
  }

  const isValidPassword: boolean = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const token = createToken(user._id);
  const userData: UIUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    token,
  };

  return res.status(200).json({ user: userData });
};

// get user
export const getLoggedInUserData = (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return null;
  }
};
