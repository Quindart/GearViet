import { Icon } from '@iconify/react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { IOrder } from 'types/order';
import CustomShippingDetail from './style';

type ShippingDetailPropType = {
  order: IOrder;
};

const OrderStatus = (props: ShippingDetailPropType) => {
  const { status, paymentStatus, transactionNo, payDate } = props.order;

  return (
    <CustomShippingDetail>
      <>
        <Box className='header__bx'>
          <Icon icon='ri:map-pin-line' className='text-[#878A99]' />
          <Typography className='header__text'>Order Status</Typography>
        </Box>
        <Box className='p-4'>
          <Typography className='content__text'>Trạng thái đơn hàng: {status}</Typography>
          <Typography className='content__text'>Trạng thái thanh toán: {paymentStatus}</Typography>
          <Typography className='content__text'>Số hóa đơn thanh toán: {transactionNo}</Typography>
          <Typography className='content__text'>Ngày thanh toán: {payDate}</Typography>
        </Box>
      </>
    </CustomShippingDetail>
  );
};

export default OrderStatus;
