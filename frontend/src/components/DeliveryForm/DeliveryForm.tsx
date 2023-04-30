import { FC, FormEvent } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { IDeliveryFormData } from '../../types.ts';

import styles from './DeliveryForm.module.scss';

interface IFormProps {
  onChange: (value: any) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  formData: IDeliveryFormData;
}

const DeliveryForm: FC<IFormProps> = ({ onChange, onSubmit, formData }: IFormProps) => {
  return (
    <div className={styles.deliveryForm}>
      <h2 className={styles.header}>Create Delivery</h2>
      <form className={styles.formData} onSubmit={onSubmit}>
        <FormControl className={styles.formControl}>
          <InputLabel htmlFor="email">Customer Name</InputLabel>
          <OutlinedInput
            id="customerName"
            type="text"
            value={formData.customerName}
            name="customerName"
            onChange={onChange}
            label="customerName"
          />
        </FormControl>
        <FormControl className={styles.formControl}>
          <InputLabel htmlFor="email">Warehouse Address</InputLabel>
          <OutlinedInput
            id="warehouseAddress"
            type="text"
            value={formData.warehouseAddress}
            name="warehouseAddress"
            onChange={onChange}
            label="warehouseAddress"
          />
        </FormControl>
        <FormControl className={styles.formControl}>
          <OutlinedInput
            id="deliveryDate"
            type="date"
            value={formData.deliveryDate}
            name="deliveryDate"
            onChange={onChange}
            label="deliveryDate"
          />
        </FormControl>
        <FormControl className={styles.formControl}>
          <InputLabel htmlFor="email">Delivery Address</InputLabel>
          <OutlinedInput
            id="deliveryAddress"
            type="text"
            value={formData.deliveryAddress}
            name="deliveryAddress"
            onChange={onChange}
            label="deliveryAddress"
          />
        </FormControl>
        <FormControl className={styles.formControl}>
          <Button type="submit" variant="contained" className={styles.button}>
            Submit delivery
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default DeliveryForm;
