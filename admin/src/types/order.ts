import { ProductDataType } from './product';

export interface ShipperDetailType {
  fullname: string;
  address: {
    province: {
      provinceId: number;
      provinceName: string;
    };
    district: {
      districtId: number;
      districtName: string;
    };
    ward: {
      wardId: number;
      wardName: string;
    };
    detail: string;
  };
  phone: string;
  email: string;
}

export interface OrderProductsType {
  product: ProductDataType;
  quantity: number;
  _id: string;
  name?: string;
  price?: string;
  id?: string;
  rating?: string;
  total?: number;
}

export interface IOrder {
  _id: string;
  code: string;
  user: string;
  products: OrderProductsType[];
  shippingDetail?: ShipperDetailType;
  customerInfo?: {
    fullname: string;
    phone: string;
    email: string;
    address: string;
  };
  createdAt?: string;
  updatedAt?: string;
  coupon?: {
    _id: string;
    code: string;
    discount: number;
  };
  status: string;
  paymentStatus: string;
  transactionNo?: string;
  payDate?: string;
  paymentType: string;
}

export interface ShippingOrderType {
  weight: string;
  length: string;
  width: string;
  height: string;
}

export interface FilterOrderType {
  status?: string;
  warehouseUser?: string;
  paymentStatus?: string;
  code?: string;
  paymentType?: string;
}
