import { Request, Response } from 'express';
import  asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

import Delivery from '../models/Delivery';
import User from '../models/User';
import { User as UserType } from '../types';



// get all deliveries
export const getDeliveryList = asyncHandler(async (req: Request, res: Response) => {
  const { user_id } = req.body;
  const deliveries = await Delivery.find({ user_id });
  res.status(200).json({ deliveries });
});

// get individual deliveries
export const getDelivery = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id, no such delivery record' });
  }
  const { user } = req.body;
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  const delivery = await Delivery.findById(id);
  if (!delivery) {
    return res.status(404).json({ error: 'No delivery record found' });
  }

  if (String(delivery.user_id) !== String(user._id)) {
    return res.status(401).json({ error: 'User not authorized' });
  }

  return res.status(200).json({ delivery });
};

// create a delivery
export const createDelivery = async (req: Request, res: Response) => {
  const { customerName, warehouseAddress, deliveryDate, deliveryAddress } = req.body;
  const fields = [];

  if (!customerName) fields.push(customerName);
  if (!deliveryDate) fields.push(deliveryDate);
  if (!warehouseAddress) fields.push(warehouseAddress);
  if (!deliveryAddress) fields.push(deliveryAddress);

  if (Boolean(fields.length)) {
    return res.status(400).json({ error: 'Please fill all fields', fields })
  }
  
  try {
    const delivery = await Delivery.create(req.body);
    return res.status(200).json({ delivery });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message})
    }
  }
};

// delete a delivery
export const deleteDelivery = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id, no such delivery record' });
  }

  const { user } = req.body;
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  const delivery = await Delivery.findById(id);
  if (!delivery) {
    return res.status(404).json({ error: 'No delivery record found' });
  }

  if (String(delivery.user_id) !== String(user._id)) {
    return res.status(401).json({ error: 'User not authorized' });
  }

  try {
    const deletedDelivery = await Delivery.findByIdAndDelete(id);
    return res.status(200).json({ delivery: deletedDelivery });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message})
    }
  }
};

// update a delivery
export const updateDelivery = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id, no such delivery record' });
  }

  const { user } = req.body;
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  const delivery = await Delivery.findById(id);
  if (!delivery) {
    return res.status(404).json({ error: 'No delivery record found' });
  }

  if (String(delivery.user_id) !== String(user._id)) {
    return res.status(401).json({ error: 'User not authorized' });
  }

  try {
    const updatedDelivery = await Delivery.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ delivery: updatedDelivery });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message});
    }
  }
};
