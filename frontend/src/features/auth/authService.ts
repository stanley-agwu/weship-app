import axios from 'axios';
import { ENDPOINTS } from '../../constants';
import { IRegisterUser } from '../../types.ts';

// register user
const register = async (userData: IRegisterUser) => {
  const response = await axios.post(ENDPOINTS.users, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}

const authService = {
  register,
}

export default authService;