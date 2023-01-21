import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

import './styles.scss';
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

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(initialState);
  const [warehouseAddressLat, setWarehouseAddressLat] = useState(0);
  const [warehouseAddressLng, setWarehouseAddressLng] = useState(0);
  const [deliveryAddressLat, setDeliveryAddressLat] = useState(0);
  const [deliveryAddressLng, setDeliveryAddressLng] = useState(0);

  const { user } = useAppSelector(getAuthState);
  const { deliveries, isLoading, isSuccess, isError, errorMessage } =
    useAppSelector(getDeliveryState);

  const { customerName, warehouseAddress, deliveryDate, deliveryAddress } = formData;

  const warehouseBaseUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${warehouseAddress}`;
  const deliveryBaseUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${deliveryAddress}`;
  const fetchWareHouseAddressCoords = async () => {
    try {
      const warehouseResponse = await fetch(warehouseBaseUrl);
      const warehouseResults = await warehouseResponse.json();
      setWarehouseAddressLat(warehouseResults[0]?.lat);
      setWarehouseAddressLng(warehouseResults[0]?.lon);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDeliveryAddressCoords = async () => {
    try {
      const deliveryResponse = await fetch(deliveryBaseUrl);
      const deliveryResults = await deliveryResponse.json();
      setDeliveryAddressLat(deliveryResults[0]?.lat);
      setDeliveryAddressLng(deliveryResults[0]?.lon);
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
    setFormData(initialState);
    const deliveryData: Delivery = {
      customerName,
      deliveryDate,
      warehouseAddressLat: String(warehouseAddressLat),
      warehouseAddressLng: String(warehouseAddressLng),
      deliveryAddressLat: String(deliveryAddressLat),
      deliveryAddressLng: String(deliveryAddressLng),
    };
    dispatch(createDelivery(deliveryData));
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
    dispatch(getDeliveries());
    // return () => dispatch(reset());
  }, [dispatch, errorMessage, isError, navigate, user]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="dashboard">
      <section className="dashboard-display">
        {Boolean(Object.keys(deliveries).length) &&
          deliveries.deliveries.map((delivery, idx) => {
            const deliveryProp: LocationProps = {
              deliveryData: { ...delivery },
            };
            return <LocationCard {...deliveryProp} key={idx} />;
          })}
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
