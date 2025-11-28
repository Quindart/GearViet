import { api } from "@/lib/api";
import { Order, CreateOrderData } from "@/types/order";
import { OrderResponse, OrdersResponse } from "@/types/api-response";

/**
 * Get order by ID
 */
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const result = await api.get<OrderResponse>(`/order/${orderId}`);
    return result.order || null;
  } catch (error) {
    console.error("Get order by ID error:", error);
    return null;
  }
};

/**
 * Get orders by user ID
 */
export const getOrdersByUserId = async (userId: string): Promise<Order[]> => {
  try {
    const result = await api.get<OrdersResponse>(`/order/user/${userId}`);
    return result.orders || [];
  } catch (error) {
    console.error("Get orders by user ID error:", error);
    return [];
  }
};

/**
 * Create a new order
 */
export const createOrder = async (data: CreateOrderData): Promise<Order | null> => {
  try {
    const result = await api.post<OrderResponse & { newOrder?: Order }>(
      "/order",
      data as unknown as Record<string, unknown>
    );
    return result.order || result.newOrder || null;
  } catch (error) {
    console.error("Create order error:", error);
    return null;
  }
};

