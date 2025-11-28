import { Icon } from '@iconify/react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { IOrder } from 'types/order';
import CustomShippingDetail from './style';

type ShippingDetailPropType = {
  order: IOrder;
};

const OrderStatus = (props: ShippingDetailPropType) => {
  const { t } = useTranslation();
  const { status, paymentStatus, transactionNo, payDate } = props.order;

  const getStatusTranslation = (statusValue: string) => {
    const statusKey = statusValue.toLowerCase();
    return t(`pages/orders:${statusKey}`, { defaultValue: statusValue });
  };

  const getPaymentStatusTranslation = (paymentStatusValue: string) => {
    if (paymentStatusValue === 'paid') {
      return t('pages/orders:paymentStatusPaid', { defaultValue: 'Paid' });
    }
    return t('pages/orders:paymentStatusUnpaid', { defaultValue: 'Unpaid' });
  };

  return (
    <CustomShippingDetail>
      <>
        <Box className='header__bx'>
          <Icon icon='ri:map-pin-line' className='text-[#878A99]' />
          <Typography className='header__text'>{t('pages/orders:orderStatus', { defaultValue: 'Order Status' })}</Typography>
        </Box>
        <Box className='p-4'>
          <Typography className='content__text'>
            {t('pages/orders:orderStatusLabel', { defaultValue: 'Order status' })}: {getStatusTranslation(status)}
          </Typography>
          <Typography className='content__text'>
            {t('pages/orders:paymentStatus', { defaultValue: 'Payment status' })}: {getPaymentStatusTranslation(paymentStatus)}
          </Typography>
          {transactionNo && (
            <Typography className='content__text'>
              {t('pages/orders:transactionNo', { defaultValue: 'Transaction number' })}: {transactionNo}
            </Typography>
          )}
          {payDate && (
            <Typography className='content__text'>
              {t('pages/orders:payDate', { defaultValue: 'Payment date' })}: {payDate}
            </Typography>
          )}
        </Box>
      </>
    </CustomShippingDetail>
  );
};

export default OrderStatus;
