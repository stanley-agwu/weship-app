import express from 'express';

import { createDelivery,
          deleteDelivery,
          getDelivery,
          getDeliveryList,
          updateDelivery
        } from '../controllers/deliveryControllers';

const router = express.Router();

router.route('/').get(getDeliveryList).post(createDelivery);

router.route('/:id').get(getDelivery).delete(deleteDelivery).put(updateDelivery);

export default router;
