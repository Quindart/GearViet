import { useSnackbar } from 'notistack';
import { useOrderStore } from '../store';
import type { FilterOrderParams, ShippingOrderData } from '../store/useOrderStore';
import type { User } from '../store';

const useOrder = () => {
  const {
    orders: orderList,
    totalPages: totalRows,
    currentPage: page,
    isLoading,
    limit,
    recentOrders,
    totalRevenueByTime,
    totalOrderByTime,
    setLimit,
    setPage,
    fetchOrders: getAllOrder,
    search,
    createShippingOrder,
    getRecentOrders,
    searchAssignedOrder,
    getAllAssignedOrder,
    handleFilterOrder,
    fetchRevenue,
    fetchOrderCount,
  } = useOrderStore();

  const { enqueueSnackbar } = useSnackbar();

  const handleSearchOrder = async (key: string, value: string) => {
    try {
      await search(`${key}=${value}&page=${page}&limit=${limit}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error searching orders';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  const handleGetAllAssignedOrder = async (currentUser: User) => {
    try {
      if (['owner', 'warehouse', 'admin'].includes(currentUser.role)) {
        await getAllAssignedOrder(currentUser._id, currentUser.role);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching assigned orders';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  const handleSearchAssignedOrder = async (currentUser: User, code: string) => {
    try {
      if (['owner', 'warehouse', 'admin'].includes(currentUser.role)) {
        await searchAssignedOrder(currentUser._id, code, currentUser.role);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error searching assigned orders';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  const handleCreateShippingOrder = async (orderId: string, data: ShippingOrderData) => {
    try {
      await createShippingOrder(orderId, data);
      enqueueSnackbar('Shipping order created successfully. Waiting for shipper', {
        variant: 'success',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error creating shipping order';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  const handleGetRecentOrder = async () => {
    try {
      await getRecentOrders();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching recent orders';
      console.error(message);
    }
  };

  const handleGetTotalRevenueByTime = async (time: string) => {
    try {
      await fetchRevenue(time);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching total revenue';
      console.error(message);
    }
  };

  const handleGetTotalOrderByTime = async (time: string) => {
    try {
      await fetchOrderCount(time);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching total orders';
      console.error(message);
    }
  };

  const handleFilterOrders = async (filterData: FilterOrderParams) => {
    try {
      await handleFilterOrder(filterData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error filtering orders';
      console.error(message);
    }
  };

  return {
    orderList,
    totalRows,
    page,
    isLoading,
    getAllOrder,
    searchOrder: handleSearchOrder,
    getAllAssignedOrder: handleGetAllAssignedOrder,
    createShippingOrder: handleCreateShippingOrder,
    setPage,
    limit,
    setLimit,
    searchAssignedOrder: handleSearchAssignedOrder,
    getRecentOrder: handleGetRecentOrder,
    recentOrders,
    totalOrderByTime,
    getTotalOrderByTime: handleGetTotalOrderByTime,
    totalRevenueByTime,
    getTotalRevenueByTime: handleGetTotalRevenueByTime,
    filterOrder: handleFilterOrders,
  };
};

export default useOrder;
