import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IUserPayload, UIUser } from '../types';

export const requiredAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization?.startsWith('Bearer')) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization?.split(' ').reverse()[0];

  const { _id } = jwt.verify(token, process.env.JWT_SECRET as string) as IUserPayload;

  try {
    const user: UIUser | null = await User.findById(_id).select('-password');
    req.body.user_id = user?._id;
    req.body.user = user;
    return next();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(401).json({ error: 'Request is not authorized' });
    }
    return null;
  }
};
