import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

// register a user
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'register user' });
});

// login a user
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'login user' });
});

// get user
export const getUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'get user data' });
});