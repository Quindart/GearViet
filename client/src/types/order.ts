import { Product } from './product';

export interface OrderProduct {
  product: Product;
  quantity: number;
  currentPrice: number;
  _id: string;
}

export interface CustomerInfo {
  fullname: string;
  phone: string;
  email?: string;
  address: string;
}

export interface Order {
  _id: string;
  code: string;
  user: string;
  products: OrderProduct[];
  customerInfo: CustomerInfo;
  status: string;
  paymentType: string;
  paymentStatus: string;
  transactionNo?: number;
  payDate?: string;
  coupon?: {
    _id: string;
    code: string;
    discount: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateOrderData {
  products: {
    product: string;
    quantity: number;
    currentPrice: number;
  }[];
  customerInfo: CustomerInfo;
  paymentType: string;
  coupon?: string;
}

export interface OrderStatus {
  status: string;
}

