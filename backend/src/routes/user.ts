import express from 'express';

import { registerUser,
          loginUser,
          getUser,
        } from '../controllers/userControllers';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/user', getUser);

export default router;