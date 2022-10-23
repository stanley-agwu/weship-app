
// @ts-nocheck
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

const initialState: IDeliveryFormData = {
  customerName: '',
  warehouseAddress: '',
  deliveryDate: '',
  deliveryAddress: '',
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(getAuthState);
  const [formData, setFormData] = useState(initialState);
  const [warehouseLat, setWarehouseLat] = useState(0);
  const [warehouseLng, setWarehouseLng] = useState(0);
  const [deliveryLat, setDeliveryLat] = useState(0);
  const [deliveryLng, setDeliveryLng] = useState(0);

  const { customerName, warehouseAddress, deliveryDate, deliveryAddress } = formData;

  const wareHouseBaseUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${warehouseAddress}`;
  const deliveryBaseUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${deliveryAddress}`;
  const fetchWareHouseCoords = async () => {
    const wareHouseResponse = await fetch(wareHouseBaseUrl);
    const wareHouseResults = await wareHouseResponse.json();
    console.log(wareHouseResults);
    setWarehouseLat(wareHouseResults[0]?.lat);
    setWarehouseLng(wareHouseResults[0]?.lon);
  };
  const fetchDeliveryAddressCoords = async () => {
    const deliveryResponse = await fetch(deliveryBaseUrl);
    const deliveryResults = await deliveryResponse.json();
    console.log(deliveryResults);
    setDeliveryLat(deliveryResults[0]?.lat);
    setDeliveryLng(deliveryResults[0]?.lon);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (customerName && warehouseAddress && deliveryDate && deliveryAddress) {
      fetchWareHouseCoords();
      fetchDeliveryAddressCoords();
    }
    setFormData(initialState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState, [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  return (
    <div className="dashboard">
      <section className="dashboard-display">

      </section>
      <section>
        <div className="form-group">
          <h2>Create Delivery</h2>
          <form className="form-data" onSubmit={handleSubmit}>
            <FormControl sx={{ m: 1, width: '22rem' }} variant="outlined">
              <InputLabel htmlFor="email">Customer Name</InputLabel>
              <OutlinedInput
                id="customerName"
                type="text"
                value={customerName}
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
                value={warehouseAddress}
                name="warehouseAddress"
                onChange={handleChange}
                label="warehouseAddress"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '22rem' }} variant="outlined">
              {/* <InputLabel htmlFor="email">Delivery date</InputLabel> */}
              <OutlinedInput
                id="deliveryDate"
                type="date"
                value={deliveryDate}
                name="deliveryDate"
                onChange={handleChange}
                label="deliveryDate"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '22rem' }} variant="outlined">
              <InputLabel htmlFor="email">Delivery Address</InputLabel>
              <OutlinedInput
                id="deliveryAddress"
                type="text"
                value={deliveryAddress}
                name="deliveryAddress"
                onChange={handleChange}
                label="deliveryAddress"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '22rem' }} variant="outlined">
              <Button type="submit" variant="contained" className="submit">Submit delivery</Button>
            </FormControl>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Dashboard;