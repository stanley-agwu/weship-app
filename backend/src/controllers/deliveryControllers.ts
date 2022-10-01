import { Request, Response } from 'express';
import  asyncHandler from 'express-async-handler';

import Customer from '../models/Customer';

// get all deliveries
export const getDeliveryList = asyncHandler(async (req: Request, res: Response) => {
  const Customers = await Customer.find();
  res.status(200).json({ Customers });
});

// get individual deliveries
export const getDelivery = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ 'msg': `Get a delivery of id: ${req.params.id}`});
});

// create a delivery
export const createDelivery = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ 'msg': 'A delivery is created' });
});

// delete a delivery
export const deleteDelivery = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ 'msg': `A delivery of id: ${req.params.id} is deleted` });
});

// update a delivery
export const updateDelivery = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ 'msg': `A delivery of id: ${req.params.id} is updated` });
});
