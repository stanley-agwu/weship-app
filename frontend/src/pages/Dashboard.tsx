import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

import './styles.scss';
import { useAppSelector } from '../app/hooks';
import { getAuthState } from '../features/auth/getters';
import { IDeliveryFormData } from '../types.ts';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(getAuthState);
  const [formData, setFormData] = useState<IDeliveryFormData>({
    customerName: '',
    warehouseAddress: '',
    deliveryAddress: '',
  })

  const handleSubmit = () => {}

  const handleChange = () => {}

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user])
  return (
    <div className="dashboard">
      <section className="dashboard-display">

      </section>
      <section>
        <form className="form-data" onSubmit={handleSubmit}>
          <FormControl sx={{ m: 1, width: '22rem' }} variant="outlined">
            <InputLabel htmlFor="email">Customer name</InputLabel>
            <OutlinedInput
              id="customerName"
              type="text"
              value={formData.customerName}
              name="customerName"
              onChange={handleChange}
              label="customerName"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '22rem' }} variant="outlined">
            <InputLabel htmlFor="email">Warehouse Address</InputLabel>
            <OutlinedInput
              id="warehouseAddress"
              type="text"
              value={formData.warehouseAddress}
              name="warehouseAddress"
              onChange={handleChange}
              label="warehouseAddress"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '22rem' }} variant="outlined">
            <InputLabel htmlFor="email">Delivery Address</InputLabel>
            <OutlinedInput
              id="deliveryAddress"
              type="text"
              value={formData.deliveryAddress}
              name="deliveryAddress"
              onChange={handleChange}
              label="deliveryAddress"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '22rem' }} variant="outlined">
            <Button type="submit" variant="contained" className="submit">Submit delivery</Button>
          </FormControl>
        </form>
      </section>
    </div>
  )
}

export default Dashboard;