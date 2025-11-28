export interface Coupon {
  _id: string;
  code: string;
  discount: number;
  startDate: string;
  endDate: string;
  available: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ValidateCouponData {
  code: string;
}

export interface ValidateCouponResponse {
  valid: boolean;
  discount?: number;
  message?: string;
}

