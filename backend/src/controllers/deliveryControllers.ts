import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
// eslint-disable-next-line import/no-unresolved
import { Delivery as IDelivery, UIUser } from 'src/types';
import Delivery from '../models/Delivery';

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
  const { user }: { user: UIUser } = req.body;
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
  const {
    customerName,
    deliveryDate,
    warehouseAddress,
    warehouseAddressLat,
    warehouseAddressLng,
    deliveryAddress,
    deliveryAddressLat,
    deliveryAddressLng,
  } = req.body;
  const fields = [];

  if (!customerName) fields.push('customerName');
  if (!deliveryDate) fields.push('deliveryDate');
  if (!warehouseAddressLat || !warehouseAddressLng || !warehouseAddress)
    fields.push('warehouseAddress');
  if (!deliveryAddressLat || !deliveryAddressLng || !deliveryAddress)
    fields.push('deliveryAddress');

  if (fields.length) {
    return res.status(400).json({ error: 'Please fill all fields', fields });
  }

  try {
    const delivery = await Delivery.create(req.body);
    return res.status(200).json({ delivery });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return null;
  }
};

// delete a delivery
export const deleteDelivery = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id, no such delivery record' });
  }
  const { user }: { user: UIUser } = req.body;
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
      return res.status(500).json({ error: error.message });
    }
    return null;
  }
};

// update a delivery
export const updateDelivery = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id, no such delivery record' });
  }

  const { user }: { user: UIUser } = req.body;
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

  type RequestBody = IDelivery & {
    user: UIUser;
  };
  const reqBody: RequestBody = req.body;

  try {
    const updatedDelivery = await Delivery.findByIdAndUpdate(id, reqBody, { new: true });
    return res.status(200).json({ delivery: updatedDelivery });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return null;
  }
};
