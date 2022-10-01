import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
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
  deliveryName: {
    type: String,
  },
  deliveryWeight: {
    type: String,
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

export default mongoose.model('Customer', CustomerSchema);