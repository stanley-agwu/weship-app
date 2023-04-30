import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './Dashboard.module.scss';
import Table from '../../components/Table/Table';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getAuthState } from '../../features/auth/getters';
import { Delivery, IDeliveryFormData } from '../../types.ts';
import { createDelivery, getDeliveries } from '../../features/delivery/deliverySlice';
import { getDeliveryState } from '../../features/delivery/getters';
import Loader from '../../components/Loader/Loader';
import DeliveryForm from '../../components/DeliveryForm/DeliveryForm';
import { Grid } from '@mui/material';

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
  const { deliveries, isLoading, isError, errorMessage } = useAppSelector(getDeliveryState);

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
    deliveryDataRef.current = {
      ...deliveryDataRef.current,
      customerName,
      deliveryDate,
      warehouseAddress,
      deliveryAddress,
    };

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
    return <Loader />;
  }

  return (
    <Grid
      className={styles.dashboard}
      container
      display="flex"
      spacing={2}
      flexDirection={{ xs: 'column', xl: 'row' }}
    >
      <Grid item xs={12} xl={5} display="flex" justifyContent="center">
        <DeliveryForm onSubmit={handleSubmit} onChange={handleChange} formData={formData} />
      </Grid>
      <Grid item xs={12} xl={7}>
        <Table {...deliveries} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
