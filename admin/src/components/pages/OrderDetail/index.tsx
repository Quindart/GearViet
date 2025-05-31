import { Box } from '@mui/material';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOrderById } from 'services/orderApi';
import { ResponseType } from 'types';
import { IOrder } from 'types/order';
import { APP_ROUTES } from 'utils/app-config';
import CustomerDetail from './CustomerDetail';
import OrderStatus from './OrderStatus';
import ProductTable from './ProductTable';
import ShippingDetail from './ShippingDetail';
import CustomOrderDetail from './style';

const OrderDetailTemplate = () => {
  const [order, setOrder] = React.useState<IOrder>({} as IOrder);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  React.useEffect(() => {
    if (params.orderId) {
      fetchOrderById(params.orderId)
        .then((res: ResponseType) => {
          if (!res.success) {
            navigate(APP_ROUTES.ALL_ORDER);
            return;
          }
          if (res.order) {
            setOrder(res.order);
            return;
          }
        })
        .catch((error: AxiosError) => {
          enqueueSnackbar(error.message, {
            variant: 'error',
          });
          navigate(APP_ROUTES.ALL_ORDER);
        });
    } else {
      navigate(APP_ROUTES.ALL_ORDER);
    }
  }, [params]);

  return (
    <CustomOrderDetail className='2xl:flex-row'>
      <Box className='2xl:w-[80%]'>
        <ProductTable order={order} />
      </Box>
      <Box className='2xl:w-[20%] flex flex-col gap-4 min-w-[384px]'>
        <CustomerDetail order={order} />
        <ShippingDetail order={order} />
        <OrderStatus order={order} />
      </Box>
    </CustomOrderDetail>
  );
};

export default OrderDetailTemplate;
