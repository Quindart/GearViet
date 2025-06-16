import { create } from 'zustand';
import { api } from '@/lib/api';

export interface Order {
  _id: string;
  code: string;
  user: string;
  products: Array<{
    product: string;
    quantity: number;
    price: number;
  }>;
  totalPrice: number;
  status: 'pending' | 'assigned' | 'shipping' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentType: 'cod' | 'online';
  shippingInfo?: {
    address: string;
    phone: string;
    note?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FilterOrderParams {
  status?: string;
  paymentStatus?: string;
  paymentType?: string;
}

export interface ShippingOrderData {
  address: string;
  phone: string;
  note?: string;
}

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  limit: number;
  recentOrders: Order[];
  totalRevenueByTime: number;
  totalOrderByTime: number;

  // Actions
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
  fetchOrders: (page: number, limit: number) => Promise<void>;
  fetchOrderById: (id: string) => Promise<void>;
  search: (query: string) => Promise<void>;
  filter: (query: string) => Promise<void>;
  createShippingOrder: (orderId: string, data: ShippingOrderData) => Promise<void>;
  fetchRevenue: (timeRange: string) => Promise<number>;
  fetchOrderCount: (timeRange: string) => Promise<number>;
  getRecentOrders: () => Promise<void>;
  searchAssignedOrder: (userId: string, code: string, role: string) => Promise<void>;
  getAllAssignedOrder: (userId: string, role: string) => Promise<void>;
  handleFilterOrder: (filterData: FilterOrderParams) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  selectedOrder: null,
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  error: null,
  limit: 5,
  recentOrders: [],
  totalRevenueByTime: 0,
  totalOrderByTime: 0,

  setLimit: (limit: number) => set({ limit }),
  setPage: (page: number) => {
    const { limit, fetchOrders } = get();
    fetchOrders(page, limit);
  },

  fetchOrders: async (page: number, limit: number) => {
    try {
      set({ isLoading: true });
      const response = await api.get<{ orders: Order[]; totalPages: number }>(
        `/orders?page=${page}&limit=${limit}`
      );
      if (response.success && response.data) {
        set({
          orders: response.data.orders,
          totalPages: response.data.totalPages,
          currentPage: page,
          error: null,
        });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchOrderById: async (id: string) => {
    try {
      set({ isLoading: true });
      const response = await api.get<{ order: Order }>(`/orders/${id}`);
      if (response.success && response.data) {
        set({ selectedOrder: response.data.order, error: null });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  search: async (query: string) => {
    try {
      set({ isLoading: true });
      const response = await api.get<{ orders: Order[]; totalPages: number }>(
        `/orders/search?${query}`
      );
      if (response.success && response.data) {
        set({
          orders: response.data.orders,
          totalPages: response.data.totalPages,
          error: null,
        });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  filter: async (query: string) => {
    try {
      set({ isLoading: true });
      const response = await api.get<{ orders: Order[]; totalPages: number }>(
        `/orders/filter?${query}`
      );
      if (response.success && response.data) {
        set({
          orders: response.data.orders,
          totalPages: response.data.totalPages,
          error: null,
        });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  createShippingOrder: async (orderId: string, data: ShippingOrderData) => {
    try {
      set({ isLoading: true });
      const response = await api.post<{ order: Order }>(
        `/orders/${orderId}/shipping`,
        { ...data } as unknown as Record<string, unknown>
      );
      if (response.success && response.data?.order) {
        const orders = get().orders.map(order =>
          order._id === orderId ? response.data.order : order
        );
        set({ orders, error: null });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchRevenue: async (timeRange: string) => {
    try {
      set({ isLoading: true });
      const response = await api.get<{ revenue: number }>(
        `/orders/revenue?timeRange=${timeRange}`
      );
      if (response.success && response.data) {
        set({ totalRevenueByTime: response.data.revenue });
        return response.data.revenue;
      }
      return 0;
    } catch (error) {
      set({ error: (error as Error).message });
      return 0;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchOrderCount: async (timeRange: string) => {
    try {
      set({ isLoading: true });
      const response = await api.get<{ count: number }>(
        `/orders/count?timeRange=${timeRange}`
      );
      if (response.success && response.data) {
        set({ totalOrderByTime: response.data.count });
        return response.data.count;
      }
      return 0;
    } catch (error) {
      set({ error: (error as Error).message });
      return 0;
    } finally {
      set({ isLoading: false });
    }
  },

  getRecentOrders: async () => {
    try {
      set({ isLoading: true });
      const response = await api.get<{ orders: Order[]; totalPages: number }>(
        `/orders?page=1&limit=5`
      );
      if (response.success && response.data) {
        set({
          recentOrders: response.data.orders,
          error: null,
        });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  searchAssignedOrder: async (userId: string, code: string, role: string) => {
    try {
      set({ isLoading: true });
      const { currentPage: page, limit } = get();
      const query = role.toLowerCase() === 'warehouse'
        ? `status=assigned&warehouseUser=${userId}&code=${code}&page=${page}&limit=${limit}`
        : `status=assigned&code=${code}&page=${page}&limit=${limit}`;
      await get().filter(query);
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  getAllAssignedOrder: async (userId: string, role: string) => {
    try {
      set({ isLoading: true });
      const { currentPage: page, limit } = get();
      const query = role.toLowerCase() === 'warehouse'
        ? `status=assigned&warehouseUser=${userId}&page=${page}&limit=${limit}`
        : `status=assigned&page=${page}&limit=${limit}`;
      await get().filter(query);
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  handleFilterOrder: async (filterData: FilterOrderParams) => {
    try {
      set({ isLoading: true });
      const { currentPage: page, limit } = get();
      const { status, paymentStatus, paymentType } = filterData;
      let query = `page=${page}&limit=${limit}`;
      if (paymentStatus && paymentStatus !== 'all') query += `&paymentStatus=${paymentStatus}`;
      if (paymentType && paymentType !== 'all') query += `&paymentType=${paymentType}`;
      if (status && status !== 'all') query += `&status=${status}`;
      await get().filter(query);
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
})); 