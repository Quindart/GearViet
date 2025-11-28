export interface CreatePaymentUrlData {
  orderId: string;
  amount: number;
  returnUrl?: string;
  orderInfo?: string;
}

export interface PaymentUrlResponse {
  vnpUrl: string;
  transactionNo?: string;
}

export interface PaymentSuccessResponse {
  success: boolean;
  orderId: string;
  transactionNo: string;
  amount: number;
  message?: string;
}

