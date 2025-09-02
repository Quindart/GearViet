import { ICoupon } from './coupon';
import { IOrder } from './order';
import { ProductDataType, CommentType, ReviewType, ReviewStatsType } from './product';
import { ProvinceType, WardType, DistrictType } from './shipping';
import { IUser } from './user';

export interface ResponseType {
  success?: string;
  status?: number;
  message?: string;
  token?: string;
  user?: IUser;
  users?: IUser[];
  categories?: Categories[];
  category?: Categories;
  products?: ProductDataType[];
  product?: ProductDataType;
  totalRows?: number;
  brands?: string[];
  userStatus?: string;
  role?: string;
  productStatus?: string;
  orders?: IOrder[];
  order?: IOrder;
  comments?: CommentType[];
  reviews?: ReviewType[];
  comment?: CommentType;
  coupon?: ICoupon[];
  coupons?: ICoupon[];
  newCoupon?: ICoupon;
  msg?: string;
  totalRevenue?: number;
  data?: ProvinceType[] | DistrictType[] | WardType[];
  total?: number;
  image?: {
    public_id?: string;
    url?: string;
  };
  stats?: ReviewStatsType[];
}

export interface Subcategory {
  _id: string;
  name: string;
}

export interface Categories {
  _id: string;
  name: string;
  subcategory: Subcategory[];
}

export type DropDownType = {
  _id: number;
  name: string;
};

export type { ICoupon } from './coupon';
export type { IOrder } from './order';
export type { ProductDataType, CommentType, ReviewType, ReviewStatsType } from './product';
export type { ProvinceType, WardType, DistrictType } from './shipping';
export type { IUser } from './user';
