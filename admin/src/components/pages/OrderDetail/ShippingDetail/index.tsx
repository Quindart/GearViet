import { Icon } from '@iconify/react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { IOrder } from 'types/order';
import CustomShippingDetail from './style';

type ShippingDetailPropType = {
  order: IOrder;
};
const ShippingDetail = (props: ShippingDetailPropType) => {
  // const detail = props.order;
  const { shippingDetail } = props.order;
  return (
    <CustomShippingDetail>
      {shippingDetail && (
        <>
          <Box className='header__bx'>
            <Icon icon='ri:map-pin-line' className='text-[#878A99]' />
            <Typography className='header__text'>Shipping Address</Typography>
          </Box>
          <Box className='p-4'>
            <Typography className='content__text text-sm font-medium'>
              {shippingDetail?.fullname}
            </Typography>
            <Typography className='content__text'>
              Số điện thoại: {shippingDetail?.phone}
            </Typography>
            <Typography className='content__text'>
              Địa chỉ: {shippingDetail ? shippingDetail?.address.detail : ''}
            </Typography>
            <Typography className='content__text'>
              Xã/Phường: {shippingDetail?.address?.ward?.wardName}
            </Typography>
            <Typography className='content__text'>
              Quận/Huyện: {shippingDetail?.address?.district?.districtName}
            </Typography>
            <Typography className='content__text'>
              Tỉnh/Thành: {shippingDetail?.address?.province?.provinceName}
            </Typography>
            <Typography className='content__text'>
              Địa chỉ đầy đủ:{' '}
              {`${shippingDetail?.address.detail} - 
                ${shippingDetail?.address?.ward?.wardName} -
                ${shippingDetail?.address?.district?.districtName} -
                ${shippingDetail?.address?.province?.provinceName}`}
            </Typography>
          </Box>
        </>
      )}
    </CustomShippingDetail>
  );
};

export default ShippingDetail;
