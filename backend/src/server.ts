import express, { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './db/db';

import deliveryRoutes from './routes/delivery';
import userRoutes from './routes/user';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
dotenv.config({ path: './config/config.env'});
colors.enable();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
})

// routes
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/users', userRoutes);

// connect db
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`.magenta));