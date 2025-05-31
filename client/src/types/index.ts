import { ICoupon } from './coupon';
import { IOrder } from './order';
import { ProductDataType, CommentType, ReviewType, ReviewStatsType } from './product';
import { ProvinceType, WardType } from './shipping';
import { IUser } from './user';
import { DistrictType } from 'types/shipping';

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
