import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IOrder } from 'types/order';
import CustomCustomerDetail from './style';

type CustomerDetailPropType = {
  order: IOrder;
};
const CustomerDetail = (props: CustomerDetailPropType) => {
  const { t } = useTranslation();
  const detail = props && props.order;

  const customerInfo = (detail && detail.customerInfo) || (detail && detail.shippingDetail);
  const customerName = 
    (detail && detail.customerInfo && detail.customerInfo.fullname) || 
    (detail && detail.shippingDetail && detail.shippingDetail.fullname) || 
    '';
  const customerEmail = 
    (detail && detail.customerInfo && detail.customerInfo.email) || 
    (detail && detail.shippingDetail && detail.shippingDetail.email) || 
    '';
  const customerPhone = 
    (detail && detail.customerInfo && detail.customerInfo.phone) || 
    (detail && detail.shippingDetail && detail.shippingDetail.phone) || 
    '';
  const customerAddress = (detail && detail.customerInfo && detail.customerInfo.address) || '';

  if (!customerInfo) {
    return null;
  }

  return (
    <CustomCustomerDetail>
      <Box className='header__bx'>
        <Typography className='header__title'>{t('pages/orders:customerDetails', { defaultValue: 'Customer Details' })}</Typography>
      </Box>
      <Box className='p-4 flex flex-col gap-4'>
        <Box className='flex gap-4'>
          <img
            src='https://themesbrand.com/velzon/html/default/assets/images/users/avatar-3.jpg'
            alt='https://themesbrand.com/velzon/html/default/assets/images/users/avatar-3.jpg'
            className='w-12 h-12 rounded-sm'
          />
          <Box>
            <Typography className='text-sm font-medium text-[#495057] mb-1'>
              {customerName}
            </Typography>
            <Typography className='text-[13px] text-[#878A99]'>{t('pages/orders:customer', { defaultValue: 'Customer' })}</Typography>
          </Box>
        </Box>
        {customerEmail && (
          <Box className='flex items-center gap-2'>
            <Icon icon='ri:mail-line' className='text-[#878a99]' />
            <Typography className='text-[13px]'>{customerEmail}</Typography>
          </Box>
        )}
        {customerPhone && (
          <Box className='flex items-center gap-2'>
            <Icon icon='ri:phone-line' className='text-[#878a99]' />
            <Typography className='text-[13px]'>{customerPhone}</Typography>
          </Box>
        )}
        {customerAddress && (
          <Box className='flex items-center gap-2'>
            <Icon icon='ri:map-pin-line' className='text-[#878a99]' />
            <Typography className='text-[13px]'>{customerAddress}</Typography>
          </Box>
        )}
      </Box>
    </CustomCustomerDetail>
  );
};

export default CustomerDetail;
