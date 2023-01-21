import axios from 'axios';
import { ENDPOINTS } from '../../constants';
import { Delivery } from '../../types.ts';

// create delivery
const createDelivery = async (deliveryData: Delivery, token: string) => {
  const response = await axios.post(`${ENDPOINTS.deliveries}`, deliveryData, {
    headers: { 
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data.delivery;
};

// get user deliveries
const getDeliveries = async (token: string) => {
  const response = await axios.get(`${ENDPOINTS.deliveries}`, {
    headers: { 
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
};

const deliveryService = {
  createDelivery,
  getDeliveries,
};

export default deliveryService;