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

  return response.data;
};

const deliveryService = {
  createDelivery,
};

export default deliveryService;