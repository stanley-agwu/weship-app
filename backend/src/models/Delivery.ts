import mongoose from 'mongoose';

import { Delivery } from '../types';

const DeliverySchema = new mongoose.Schema<Delivery>({
  customerName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  deliveryDate: {
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