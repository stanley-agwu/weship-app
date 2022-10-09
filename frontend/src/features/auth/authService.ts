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

// log out user
const logout = () => {
  localStorage.removeItem('user');
}

const authService = {
  register,
  logout,
}

export default authService;