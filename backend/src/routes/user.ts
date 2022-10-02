import express from 'express';

import { registerUser,
          loginUser,
          getLoggedInUserData,
        } from '../controllers/userControllers';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/user', getLoggedInUserData);

export default router;