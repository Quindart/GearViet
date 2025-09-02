import { api } from "@/lib/api";
import { ResponseType } from '@/types';

export interface Province {
  id: number;
  name: string;
  code: string;
}

export interface District {
  id: number;
  name: string;
  code: string;
  provinceId: number;
}

export interface Ward {
  id: number;
  name: string;
  code: string;
  districtId: number;
}

export interface ShippingService {
  id: number;
  name: string;
  price: number;
  estimatedDays: string;
}

export interface ShippingFeeParams {
  fromProvinceId: number;
  fromDistrictId: number;
  toProvinceId: number;
  toDistrictId: number;
  weight: number;
  length?: number;
  width?: number;
  height?: number;
  serviceId?: number;
}

/**
 * Get all provinces
 */
export const fetchAllProvinces = async (): Promise<ResponseType> => {
  try {
    const result = await api.get<Province[]>('/shipping/master-data/province');
    return { data: result.data || [] };
  } catch (error) {
    console.error("Fetch provinces error:", error);
    return { data: [] };
  }
};

/**
 * Get districts by province ID
 */
export const fetchAllDistrictByProvince = async (provinceId: number): Promise<ResponseType> => {
  try {
    const result = await api.get<District[]>(`/shipping/master-data/district?provinceId=${provinceId}`);
    return { data: result.data || [] };
  } catch (error) {
    console.error("Fetch districts error:", error);
    return { data: [] };
  }
};

/**
 * Get wards by district ID
 */
export const fetchAllWardByDistrict = async (districtId: number): Promise<ResponseType> => {
  try {
    const result = await api.get<Ward[]>(`/shipping/master-data/ward?districtId=${districtId}`);
    return { data: result.data || [] };
  } catch (error) {
    console.error("Fetch wards error:", error);
    return { data: [] };
  }
};

/**
 * Get available shipping services
 */
export const getAvailableShippingServices = async (params: {
  fromProvinceId: number;
  fromDistrictId: number;
  toProvinceId: number;
  toDistrictId: number;
}): Promise<ShippingService[]> => {
  try {
    const queryParams = new URLSearchParams({
      fromProvinceId: params.fromProvinceId.toString(),
      fromDistrictId: params.fromDistrictId.toString(),
      toProvinceId: params.toProvinceId.toString(),
      toDistrictId: params.toDistrictId.toString(),
    });

    const result = await api.get<ShippingService[]>(`/shipping/shipping-order/available-services?${queryParams.toString()}`);
    return result.data || [];
  } catch (error) {
    console.error("Get shipping services error:", error);
    return [];
  }
};

/**
 * Calculate shipping fee
 */
export const calculateShippingFee = async (params: ShippingFeeParams): Promise<number> => {
  try {
    const result = await api.post<{ fee: number }>('/shipping/shipping-order/fee', params as unknown as Record<string, unknown>);
    return result.data?.fee || 0;
  } catch (error) {
    console.error("Calculate shipping fee error:", error);
    return 0;
  }
};

/**
 * Create shipping order
 */
export const createShippingOrder = async (orderData: {
  orderId: number;
  serviceId: number;
  fromAddress: {
    provinceId: number;
    districtId: number;
    wardId: number;
    address: string;
  };
  toAddress: {
    provinceId: number;
    districtId: number;
    wardId: number;
    address: string;
  };
  weight: number;
  length?: number;
  width?: number;
  height?: number;
}): Promise<{ trackingCode: string } | null> => {
  try {
    const result = await api.post<{ trackingCode: string }>('/shipping/shipping-order/create', orderData as unknown as Record<string, unknown>);
    return result.data || null;
  } catch (error) {
    console.error("Create shipping order error:", error);
    return null;
  }
};

/**
 * Get shipping order details
 */
export const getShippingOrderDetails = async (trackingCode: string): Promise<any> => {
  try {
    const result = await api.get(`/shipping/shipping-order/detail?trackingCode=${trackingCode}`);
    return result.data || null;
  } catch (error) {
    console.error("Get shipping order details error:", error);
    return null;
  }
};

/**
 * Cancel shipping order
 */
export const cancelShippingOrder = async (trackingCode: string): Promise<boolean> => {
  try {
    await api.post('/shipping/switch-status/cancel', { trackingCode } as unknown as Record<string, unknown>);
    return true;
  } catch (error) {
    console.error("Cancel shipping order error:", error);
    return false;
  }
};
