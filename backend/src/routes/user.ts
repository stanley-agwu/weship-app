import express from 'express';

import { getLoggedInUserData, loginUser, registerUser } from '../controllers/userControllers';
import { requiredAuth } from '../middlewares/requiredAuth';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/user', requiredAuth, getLoggedInUserData);

export default router;
