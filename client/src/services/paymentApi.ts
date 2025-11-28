import { api } from "@/lib/api";
import { CreatePaymentUrlData, PaymentUrlResponse, PaymentSuccessResponse } from "@/types/payment";
import { ApiResponse } from "@/types/api-response";

/**
 * Create payment URL
 */
export const createPaymentUrl = async (
  data: CreatePaymentUrlData
): Promise<PaymentUrlResponse | null> => {
  try {
    const result = await api.post<ApiResponse & { url?: string; vnpUrl?: string; transactionNo?: string }>(
      "/payment/create",
      data as unknown as Record<string, unknown>
    );
    const vnpUrl = result.vnpUrl || result.url;
    return vnpUrl ? { vnpUrl, transactionNo: result.transactionNo } : null;
  } catch (error) {
    console.error("Create payment URL error:", error);
    return null;
  }
};

/**
 * Handle payment success
 */
export const handlePaymentSuccess = async (
  params: {
    vnp_TxnRef: string;
    vnp_Amount: string;
    vnp_ResponseCode: string;
  }
): Promise<PaymentSuccessResponse | null> => {
  try {
    const result = await api.get<ApiResponse & PaymentSuccessResponse>(
      `/payment/success?${new URLSearchParams({
        vnp_TxnRef: params.vnp_TxnRef,
        vnp_Amount: params.vnp_Amount,
        vnp_ResponseCode: params.vnp_ResponseCode,
      }).toString()}`
    );
    
    return {
      success: result.success || false,
      orderId: result.orderId || "",
      transactionNo: result.transactionNo || "",
      amount: result.amount || 0,
      message: result.message,
    };
  } catch (error) {
    console.error("Handle payment success error:", error);
    return null;
  }
};

