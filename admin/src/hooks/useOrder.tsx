import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  creatingShippingOrder,
  fetchAllOrder,
  fetchTotalOrderByTime,
  fetchTotalRevenueByTime,
  searchingOrder,
} from 'services/orderApi';
import { RootState } from 'store';
import { setOrderList, setOrderRenderType, setTotalRows } from 'store/slices/orderSlice';

import { ResponseType } from 'types';
import { IOrder, ShippingOrderType } from 'types/order';
import { renderType } from 'utils/app-config';
import { formatOrderList } from 'utils/helper';
import { fetchFilterOrder } from './../services/orderApi';
import { IUser } from './../types/user';
import { FilterOrderType } from '../types/order';

const useOrder = () => {
  const orderList = useSelector((state: RootState) => state.order.orderList);
  const totalRows = useSelector((state: RootState) => state.order.totalRows);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [recentOrder, setRecentOrder] = useState<IOrder[]>();
  const [totalRevenueByTime, setTotalRevenueByTime] = useState<number>(0);
  const [totalOrderByTime, setTotalOrderByTime] = useState<number>(0);

  const getAllOrder = async (page?: number, limit?: number) => {
    dispatch(setOrderList([]));
    dispatch(setOrderRenderType(renderType.ALL));

    try {
      const res: ResponseType = await fetchAllOrder(page, limit);
      if (res.success && res.orders && res.totalRows) {
        const orderList = formatOrderList(res.orders);
        dispatch(setOrderList(orderList));
        dispatch(setTotalRows(res.totalRows));
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.message);
      }
    }
  };

  const searchOrder = async (key: string, value: string) => {
    try {
      const res: ResponseType = await searchingOrder(key, value, page, limit);
      if (res.success && res.orders && res.totalRows) {
        const orderList = formatOrderList(res.orders);
        dispatch(setOrderRenderType(renderType.SEARCH));
        dispatch(setOrderList(orderList));
        dispatch(setTotalRows(res.totalRows));
      } else {
        dispatch(setOrderRenderType(renderType.SEARCH));
        dispatch(setOrderList([]));
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.message);
      }
    }
  };

  const getAllAssignedOrder = async (currentUser: IUser) => {
    try {
      if (
        currentUser.role === 'owner' ||
        currentUser.role === 'warehouse' ||
        currentUser.role === 'admin'
      ) {
        const res: ResponseType =
          currentUser.role === 'owner' || currentUser.role === 'admin'
            ? await fetchFilterOrder(`page=${page}&limit=${limit}&status=assigned`)
            : await fetchFilterOrder(
                `page=${page}&limit=${limit}&status=assigned&warehouseUser=${currentUser._id}`,
              );
        if (res.success && res.orders && res.totalRows) {
          const orderList = formatOrderList(res.orders);
          dispatch(setOrderRenderType(renderType.ALL));
          dispatch(setOrderList(orderList));
          dispatch(setTotalRows(res.totalRows));
        }
      } else {
        dispatch(setOrderList([]));
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.message);
      }
    }
  };

  const searchAssignedOrder = async (
    currentUser: IUser,
    code: string,
    page: number,
    limit: number,
  ) => {
    try {
      if (
        currentUser.role === 'owner' ||
        currentUser.role === 'warehouse' ||
        currentUser.role === 'admin'
      ) {
        const res: ResponseType =
          currentUser.role === 'owner' || currentUser.role === 'admin'
            ? await fetchFilterOrder(`page=${page}&limit=${limit}&status=assigned&code=${code}`)
            : await fetchFilterOrder(
                `page=${page}&limit=${limit}&status=assigned&warehouseUser=${currentUser._id}&code=${code}`,
              );
        if (res.success && res.orders && res.totalRows) {
          const orderList = formatOrderList(res.orders);
          dispatch(setOrderRenderType(renderType.SEARCH));
          dispatch(setOrderList(orderList));
          dispatch(setTotalRows(res.totalRows));
        } else {
          dispatch(setOrderList([]));
        }
      } else {
        dispatch(setOrderList([]));
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.message);
      }
    }
  };

  const createShippingOrder = async (orderId: string, data: ShippingOrderType) => {
    try {
      const response: ResponseType = await creatingShippingOrder(orderId, data);
      if (response.success) {
        enqueueSnackbar('Create shipping order successfully. Waiting for shipper', {
          variant: 'success',
        });
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const getRecentOrder = async () => {
    try {
      const response: ResponseType = await fetchAllOrder(1, 5);
      if (response.success && response.orders) {
        setRecentOrder(response.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalRevenueByTime = async (time: string) => {
    try {
      const response: ResponseType = await fetchTotalRevenueByTime(time);
      if (response.success && response.totalRevenue) {
        setTotalRevenueByTime(response.totalRevenue);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalOrderByTime = async (time: string) => {
    try {
      const response: ResponseType = await fetchTotalOrderByTime(time);
      if (response.success && response.total) {
        setTotalOrderByTime(response.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterOrder = async (fitlerData: FilterOrderType) => {
    try {
      const { status, paymentStatus, paymentType } = fitlerData;
      let query = `page=${page}&limit=${limit}`;
      if (paymentStatus && paymentStatus !== 'all') query += `&paymentStatus=${paymentStatus}`;
      if (paymentType && paymentType !== 'all') query += `&paymentType=${paymentType}`;
      if (status && status !== 'all') query += `&status=${status}`;

      const res: ResponseType = await fetchFilterOrder(query);

      if (res.success && res.orders && res.totalRows) {
        const orderList = formatOrderList(res.orders);
        dispatch(setOrderRenderType(renderType.FILTER));
        dispatch(setOrderList(orderList));
        dispatch(setTotalRows(res.totalRows));
      } else {
        dispatch(setOrderList([]));
        dispatch(setTotalRows(0));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    orderList,
    getAllOrder,
    searchOrder,
    totalRows,
    getAllAssignedOrder,
    createShippingOrder,
    page,
    setPage,
    limit,
    setLimit,
    searchAssignedOrder,
    getRecentOrder,
    recentOrder,
    totalOrderByTime,
    getTotalOrderByTime,
    totalRevenueByTime,
    getTotalRevenueByTime,
    filterOrder,
  };
};

export default useOrder;
