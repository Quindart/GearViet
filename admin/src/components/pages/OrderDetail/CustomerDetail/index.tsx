import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
import { IOrder } from 'types/order';
import CustomCustomerDetail from './style';

type CustomerDetailPropType = {
  order: IOrder;
};
const CustomerDetail = (props: CustomerDetailPropType) => {
  const detail = props?.order;

  return (
    <>
      {detail.shippingDetail && (
        <CustomCustomerDetail>
          <Box className='header__bx'>
            <Typography className='header__title'>Customer Details</Typography>
            {/* <Link to={'/users/'} className='text-[13px] text-[#3577f1] cursor-pointer'>
              View Profile
            </Link> */}
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
                  {detail ? detail?.shippingDetail?.fullname : ''}
                </Typography>

                <Typography className='text-[13px] text-[#878A99]'>Customer</Typography>
              </Box>
            </Box>
            <Box className='flex items-center gap-2'>
              <Icon icon='ri:mail-line' className='text-[#878a99]' />
              <Typography className='text-[13px]'>
                {detail ? detail?.shippingDetail?.email : ''}
              </Typography>
            </Box>
            <Box className='flex items-center gap-2'>
              <Icon icon='ri:phone-line' className='text-[#878a99]' />
              <Typography className='text-[13px]'>
                {detail ? detail?.shippingDetail?.phone : ''}
              </Typography>
            </Box>
          </Box>
        </CustomCustomerDetail>
      )}
    </>
  );
};

export default CustomerDetail;
