import express from 'express';
import {
  createDelivery,
  deleteDelivery,
  getDelivery,
  getDeliveryList,
  updateDelivery,
} from '../controllers/deliveryControllers';
import { requiredAuth } from '../middlewares/requiredAuth';

const router = express.Router();

router.use(requiredAuth);
router.route('/').get(getDeliveryList).post(createDelivery);
router.route('/:id').get(getDelivery).delete(deleteDelivery).put(updateDelivery);

export default router;
