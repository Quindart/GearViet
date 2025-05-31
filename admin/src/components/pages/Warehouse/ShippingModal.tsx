import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
import TextField from 'components/ui/TextField';
import useOrder from 'hooks/useOrder';
import { useState } from 'react';
import { ShippingOrderType } from 'types/order';
import { IUser } from 'types/user';
import Button from './../../ui/Button/index';
import { CustomModal } from './style';

type ShippingModalPropsType = {
  onClose: () => void;
  orderId: string;
  currentUser: IUser;
};

const ShippingModal = (props: ShippingModalPropsType) => {
  const { onClose, orderId, currentUser } = props;
  const [data, setData] = useState<ShippingOrderType>({
    weight: '',
    length: '',
    width: '',
    height: '',
  });
  const { createShippingOrder, getAllAssignedOrder } = useOrder();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSave = async () => {
    await createShippingOrder(orderId, data);
    await getAllAssignedOrder(currentUser as IUser);
    onClose();
  };

  return (
    <CustomModal>
      <Box className='header'>
        <Typography>Create shipping</Typography>
        <Icon icon='ph:x-duotone' onClick={onClose} />
      </Box>

      <Box className='content__bx'>
        <TextField
          label='Weight (gam)'
          name='weight'
          value={data.weight}
          type='string'
          placeholder='Cân nặng'
          id='weight'
          onChange={handleChange}
        />
        <TextField
          label='Length (cm)'
          name='length'
          value={data.length}
          type='string'
          placeholder='Chiều dài'
          id='length'
          onChange={handleChange}
        />
        <TextField
          label='Width  (cm)'
          name='width'
          value={data.width}
          type='string'
          placeholder='Chiều rộng'
          id='width'
          onChange={handleChange}
        />
        <TextField
          label='Height (cm)'
          name='height'
          value={data.height}
          type='string'
          placeholder='Chiều cao'
          id='height'
          onChange={handleChange}
        />
        <Box className='btn__bx'>
          <Button variant='contained' onClick={onClose}>
            Close
          </Button>
          <Button variant='contained' className='btn--success' onClick={onSave}>
            Update
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default ShippingModal;
