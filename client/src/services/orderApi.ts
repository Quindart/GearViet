import { api } from "@/lib/api";

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
}

export interface OrderPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

export interface Order {
  id: number;
  userId: number;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipping' | 'delivered' | 'cancelled';
  totalAmount: number;
  shippingFee: number;
  discountAmount: number;
  finalAmount: number;
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    ward: string;
    district: string;
    province: string;
  };
  paymentMethod: 'cod' | 'vnpay' | 'momo';
  paymentStatus: 'pending' | 'paid' | 'failed';
  couponCode?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  items: Array<{
    productId: number;
    quantity: number;
    color?: string;
    size?: string;
  }>;
  shippingAddress: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    wardId: number;
    districtId: number;
    provinceId: number;
  };
  paymentMethod: 'cod' | 'vnpay' | 'momo';
  couponCode?: string;
  notes?: string;
}

/**
 * Get all orders for the current user
 */
export const getUserOrders = async (params?: {
  page?: number;
  limit?: number;
  status?: string;
}): Promise<{ orders: Order[]; pagination: OrderPagination }> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);

    const result = await api.get<{ orders: Order[]; pagination: OrderPagination }>(`/order?${queryParams.toString()}`);
    return result.data || { orders: [], pagination: { currentPage: 1, totalPages: 1, totalItems: 0, limit: 10 } };
  } catch (error) {
    console.error("Get user orders error:", error);
    return { orders: [], pagination: { currentPage: 1, totalPages: 1, totalItems: 0, limit: 10 } };
  }
};

/**
 * Get order by ID
 */
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const result = await api.get<Order>(`/order/${orderId}`);
    return result.data || null;
  } catch (error) {
    console.error("Get order by ID error:", error);
    return null;
  }
};

/**
 * Create a new order
 */
export const createOrder = async (orderData: CreateOrderData): Promise<Order | null> => {
  try {
    const result = await api.post<Order>('/order', orderData as unknown as Record<string, unknown>);
    return result.data || null;
  } catch (error) {
    console.error("Create order error:", error);
    return null;
  }
};

/**
 * Update order status (for admin/warehouse staff)
 */
export const updateOrderStatus = async (
  orderId: string | number, 
  status: Order['status']
): Promise<Order | null> => {
  try {
    const result = await api.put<Order>(`/order/${orderId}`, { status } as unknown as Record<string, unknown>);
    return result.data || null;
  } catch (error) {
    console.error("Update order status error:", error);
    return null;
  }
};

/**
 * Cancel an order
 */
export const cancelOrder = async (orderId: string | number): Promise<boolean> => {
  try {
    await api.put(`/order/${orderId}`, { status: 'cancelled' } as unknown as Record<string, unknown>);
    return true;
  } catch (error) {
    console.error("Cancel order error:", error);
    return false;
  }
};

/**
 * Get order revenue data (admin only)
 */
export const getOrderRevenue = async (params?: {
  startDate?: string;
  endDate?: string;
  productId?: number;
}): Promise<{ totalRevenue: number; orders: number }> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.startDate) queryParams.append('startDate', params.startDate);
    if (params?.endDate) queryParams.append('endDate', params.endDate);
    if (params?.productId) queryParams.append('productId', params.productId.toString());

    const result = await api.get<{ totalRevenue: number; orders: number }>(`/order/revenue?${queryParams.toString()}`);
    return result.data || { totalRevenue: 0, orders: 0 };
  } catch (error) {
    console.error("Get order revenue error:", error);
    return { totalRevenue: 0, orders: 0 };
  }
};
