import { ShippingOrderType } from 'types/order';
import axiosConfig from './axios-config';

export const fetchAllOrder = async (page?: number | string, limit?: number | string) => {
  if (!page) page = '';
  if (!limit) limit = '';

  return await axiosConfig.get(`/api/order?page=${page}&limit=${limit}`);
};

export const fetchOrderById = async (orderId: string) => {
  return await axiosConfig.get('/api/order/' + orderId);
};

export const searchingOrder = async (key: string, value: string, page: number, limit: number) => {
  return await axiosConfig.get(`/api/order/search?${key}=${value}&page=${page}&limit=${limit}`);
};

// export const filterOrder = async (data: FilterOrderType, page?: number, limit?: number) => {
//   const { status, paymentStatus, warehouseUser, code } = data;
//   return await axiosConfig.get('/api/order/filter', {
//     params: {
//       page,
//       limit,
//       status,
//       paymentStatus,
//       warehouseUser,
//       code,
//     },
//   });
// };

export const fetchFilterOrder = async (query: string) => {
  return await axiosConfig.get('/api/order/filter?' + query);
};

export const creatingShippingOrder = async (orderId: string, data: ShippingOrderType) => {
  const { weight, length, width, height } = data;
  return await axiosConfig.post('/shipping/shipping-order/create', {
    order_id: orderId,
    weight,
    length,
    width,
    height,
    service_type_id: 2,
  });
};

export const fetchTotalRevenueByTime = async (time: string) => {
  return await axiosConfig.get(`/api/order/revenue?limit=${time}`);
};

export const fetchTotalOrderByTime = async (time: string) => {
  return await axiosConfig.get(`/api/order/total?limit=${time}`);
};
