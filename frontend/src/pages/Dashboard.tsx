import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

import './styles.scss';
import Table from '../components/Table';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getAuthState } from '../features/auth/getters';
import { Delivery, IDeliveryFormData, LocationProps } from '../types.ts';
import { createDelivery, reset, getDeliveries } from '../features/delivery/deliverySlice';
import { getDeliveryState } from '../features/delivery/getters';
import Spinner from '../components/Spinner';
import LocationCard from '../components/LocationCard';

const initialState: IDeliveryFormData = {
  customerName: '',
  warehouseAddress: '',
  deliveryDate: '',
  deliveryAddress: '',
};

const initDeliveryData: Delivery = {
  customerName: '',
  deliveryDate: '',
  warehouseAddress: '',
  warehouseAddressLat: '',
  warehouseAddressLng: '',
  deliveryAddress: '',
  deliveryAddressLat: '',
  deliveryAddressLng: '',
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(initialState);

  const deliveryDataRef = useRef(initDeliveryData);

  const { user } = useAppSelector(getAuthState);
  const { deliveries, isLoading, isSuccess, isError, errorMessage } =
    useAppSelector(getDeliveryState);

  const { customerName, warehouseAddress, deliveryDate, deliveryAddress } = formData;

  const warehouseBaseUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${warehouseAddress}`;
  const deliveryBaseUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${deliveryAddress}`;
  const fetchWareHouseAddressCoords = async () => {
    try {
      const warehouseResults = warehouseAddress && (await (await fetch(warehouseBaseUrl)).json());
      deliveryDataRef.current.warehouseAddressLat = warehouseResults[0]?.lat;
      deliveryDataRef.current.warehouseAddressLng = warehouseResults[0]?.lon;
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDeliveryAddressCoords = async () => {
    try {
      const deliveryResults = deliveryAddress && (await (await fetch(deliveryBaseUrl)).json());
      deliveryDataRef.current.deliveryAddressLat = deliveryResults[0]?.lat;
      deliveryDataRef.current.deliveryAddressLng = deliveryResults[0]?.lon;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (customerName && warehouseAddress && deliveryDate && deliveryAddress) {
      await fetchWareHouseAddressCoords();
      await fetchDeliveryAddressCoords();
    }
    deliveryDataRef.current.customerName = customerName;
    deliveryDataRef.current.deliveryDate = deliveryDate;
    deliveryDataRef.current.warehouseAddress = warehouseAddress;
    deliveryDataRef.current.deliveryAddress = deliveryAddress;
    setFormData(initialState);
    await dispatch(createDelivery(deliveryDataRef.current));
    await dispatch(getDeliveries());
    deliveryDataRef.current = initDeliveryData;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      return;
    }
    if (!user) {
      navigate('/login');
      return;
    }
    if (user) {
      /* @typescript-eslint-disable-next-line no-floating-promises */
      dispatch(getDeliveries());
    }
    // return () => dispatch(reset());
  }, [dispatch, errorMessage, isError, navigate, user]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="dashboard">
      <section className="dashboard-display">
        <Table {...deliveries} />
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
              <Button type="submit" variant="contained" className="submit">
                Submit delivery
              </Button>
            </FormControl>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
