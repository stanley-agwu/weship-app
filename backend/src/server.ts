import express, { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';

import goalsRoutes from './routes';

const app = express();
dotenv.config({ path: './config/config.env'});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
})

// routes
app.use('/api/goals', goalsRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server started on port ${PORT}`))