import { Request, Response } from 'express';
import  asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

import Delivery from '../models/Delivery';

// get all deliveries
export const getDeliveryList = asyncHandler(async (req: Request, res: Response) => {
  const deliveries = await Delivery.find();
  res.status(200).json({ deliveries });
});

// get individual deliveries
export const getDelivery = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id, no such delivery record' });
  }

  const delivery = await Delivery.findById(id);
  if (!delivery) {
    return res.status(404).json({ error: 'No delivery record found' });
  }

  res.status(200).json({ delivery });
};

// create a delivery
export const createDelivery = async (req: Request, res: Response) => {
  const { customerName, deliveryDate, warehouseAddress, deliveryAddress } = req.body;
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
    res.status(200).json({ delivery });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message})
    }
  }
};

// delete a delivery
export const deleteDelivery = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id, no such delivery record' });
  }
  
  const delivery = await Delivery.findByIdAndDelete(id);
  if (!delivery) {
    return res.status(404).json({ error: 'No delivery record found' });
  }

  res.status(200).json({ delivery });
};

// update a delivery
export const updateDelivery = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id, no such delivery record' });
  }

  const delivery = await Delivery.findByIdAndUpdate(id, req.body, { new: true });
  if (!delivery) {
    return res.status(404).json({ error: 'No delivery record found' });
  }

  res.status(200).json({ delivery });
};
