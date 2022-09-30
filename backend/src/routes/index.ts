import express, { Request, Response } from 'express';

const router = express.Router();

// get all goals
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ 'msg': 'Get all goals' });
})

// get individual goals
router.get('/:id', (req: Request, res: Response) => {
  res.status(200).json({ 'msg': `Get a goal of id: ${req.params.id}`});
})

// create a goal
router.post('/', (req: Request, res: Response) => {
  res.status(200).json({ 'msg': 'A goal created' });
})

// delete a goal
router.delete('/:id', (req: Request, res: Response) => {
  res.status(200).json({ 'msg': `A goal of id: ${req.params.id} is deleted` });
})

// update a goal
router.patch('/:id', (req: Request, res: Response) => {
  res.status(200).json({ 'msg': `A goal of id: ${req.params.id} is updated` });
})

export default router;
