import axios from 'axios';

import { ENDPOINTS } from '../../constants';
import { Delivery, DeliveryArray } from '../../types.ts';

// create delivery
const createDelivery = async (deliveryData: Delivery, token: string) => {
  const response = await axios.post(`${ENDPOINTS.deliveries}`, deliveryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { delivery }: { delivery: Delivery } = response.data;

  return delivery;
};

// get user deliveries
const getDeliveries = async (token: string) => {
  const response = await axios.get(`${ENDPOINTS.deliveries}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const deliveryArray: DeliveryArray = response.data;

  return deliveryArray;
};

const deliveryService = {
  createDelivery,
  getDeliveries,
};

export default deliveryService;
