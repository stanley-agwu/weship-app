import { Request, Response } from 'express';

// register a user
export const registerUser = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'register user' });
};

// login a user
export const loginUser = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'login user' });
};

// get user
export const getUser = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'get user data' });
};