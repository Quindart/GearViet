import { Dayjs } from 'dayjs';

export interface ICoupon {
  _id: string;
  code: string;
  discount: number;
  startDate: string;
  endDate: string;
  available: number;
  status: string;
}

export interface CouponFormDataType {
  code: string;
  discount: number;
  available: number;
  startDate: Dayjs;
  endDate: Dayjs;
  status: string;
}
