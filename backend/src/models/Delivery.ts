import mongoose from 'mongoose';

import { Delivery } from '../types';

const DeliverySchema = new mongoose.Schema<Delivery>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  customerName: {
    type: String,
    required: true,
  },
  wareHouseaddress: {
    type: String,
    required: true
  },
  deliveryDate: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model<Delivery>('Delivery', DeliverySchema);