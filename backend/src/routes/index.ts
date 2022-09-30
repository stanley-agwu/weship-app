import express, { Request, Response } from 'express';

import { createGoal,
          deleteGoal,
          getGoal,
          getGoals,
          updateGoal
        } from '../controllers/goalsControllers';

const router = express.Router();

router.route('/').get(getGoals).post(createGoal);

router.route('/:id').get(getGoal).delete(deleteGoal).put(updateGoal);

export default router;
