import mongoose from 'mongoose';

import { User } from '../types';

const UserSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: [true, 'Please provide a valid username'],
    },
    email: {
      type: String,
      required: [true, 'Please provide a valid email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a valid password'],
    },
  },
  { timestamps: true }
);

export default mongoose.model<User>('User', UserSchema);
