import mongoose from 'mongoose';

import { Delivery } from '../types';

const DeliverySchema = new mongoose.Schema<Delivery>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  customerName: {
    type: String,
    required: true,
  },
  warehouseAddressLat: {
    type: String,
    required: true
  },
  warehouseAddressLng: {
    type: String,
    required: true
  },
  deliveryDate: {
    type: String,
    required: true,
  },
  deliveryAddressLat: {
    type: String,
    required: true,
  },
  deliveryAddressLng: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model<Delivery>('Delivery', DeliverySchema);