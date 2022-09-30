import { Request, Response } from 'express';

// get all goals
export const getGoals = (req: Request, res: Response) => {
  res.status(200).json({ 'msg': 'Get all goals' });
}

// get individual goals
export const getGoal = (req: Request, res: Response) => {
  res.status(200).json({ 'msg': `Get a goal of id: ${req.params.id}`});
}

// create a goal
export const createGoal = (req: Request, res: Response) => {
  res.status(200).json({ 'msg': 'A goal created' });
}

// delete a goal
export const deleteGoal = (req: Request, res: Response) => {
  res.status(200).json({ 'msg': `A goal of id: ${req.params.id} is deleted` });
}

// update a goal
export const updateGoal = (req: Request, res: Response) => {
  res.status(200).json({ 'msg': `A goal of id: ${req.params.id} is updated` });
}
