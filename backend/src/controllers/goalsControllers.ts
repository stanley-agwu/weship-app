import { Request, Response } from 'express';
import  asyncHandler from 'express-async-handler';

// get all goals
export const getGoals = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ 'msg': 'Get all goals' });
});

// get individual goals
export const getGoal = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ 'msg': `Get a goal of id: ${req.params.id}`});
});

// create a goal
export const createGoal = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ 'msg': 'A goal created' });
});

// delete a goal
export const deleteGoal = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ 'msg': `A goal of id: ${req.params.id} is deleted` });
});

// update a goal
export const updateGoal = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ 'msg': `A goal of id: ${req.params.id} is updated` });
});
