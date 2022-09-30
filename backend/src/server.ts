import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';

import goalsRoutes from './routes';

const app = express();
dotenv.config({ path: './config/config.env'});

// routes
app.use('/api/goals', goalsRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server started on port ${PORT}`))