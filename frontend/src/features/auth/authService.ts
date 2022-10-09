import axios from 'axios';
import { ENDPOINTS } from '../../constants';
import { IRegisterUser } from '../../types.ts';

// register user
const register = async (userData: IRegisterUser) => {
  const response = await axios.post(`${ENDPOINTS.users}`, userData, {
    headers: { 
      'Content-Type': 'application/json',
    },
   });
   const results = response.data;

  if (results) {
    localStorage.setItem('user', JSON.stringify(results));
  }

  return results;
}

const authService = {
  register,
}

export default authService;