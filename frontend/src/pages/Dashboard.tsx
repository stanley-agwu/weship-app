import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../app/hooks';
import { getAuthState } from '../features/auth/getters';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(getAuthState);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard;