import { FC, FormEvent } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { IDeliveryFormData } from '../../types.ts';

interface IFormProps {
  onChange: (value: any) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  formData: IDeliveryFormData;
}

const DeliveryForm: FC<IFormProps> = ({ onChange, onSubmit, formData }: IFormProps) => {
  return (
    <div className="form-group">
      <h2>Create Delivery</h2>
      <form className="form-data" onSubmit={onSubmit}>
        <FormControl sx={{ m: 1, width: '22rem' }} variant="outlined">
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
        <FormControl sx={{ m: 1, width: '22rem' }} variant="outlined">
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
        <FormControl sx={{ m: 1, width: '22rem' }} variant="outlined">
          <OutlinedInput
            id="deliveryDate"
            type="date"
            value={formData.deliveryDate}
            name="deliveryDate"
            onChange={onChange}
            label="deliveryDate"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '22rem' }} variant="outlined">
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
        <FormControl sx={{ m: 1, width: '22rem' }} variant="outlined">
          <Button type="submit" variant="contained" className="submit">
            Submit delivery
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default DeliveryForm;
