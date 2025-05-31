import { CouponFormDataType } from 'types/coupon';
import axiosConfig from './axios-config';

export const addNewCoupon = async (formData: CouponFormDataType) => {
  return await axiosConfig.post('/coupon', formData);
};

export const fetchAllCoupon = async (page?: number | string, limit?: number | string) => {
  if (!page) page = '';
  if (!limit) limit = '';
  return await axiosConfig.get(`/coupon?page=${page}&limit=${limit}`);
};

export const fetCouponDetail = async (couponId: string) => {
  return await axiosConfig.get(`/coupon/${couponId}`);
};

export const changeCouponStatus = async (couponId: string, newStatus: string) => {
  return await axiosConfig.put(`/coupon/${couponId}`, { status: newStatus });
};

export const searchCouponService = async (couponCode: string, page?: number, limit?: number) => {
  return await axiosConfig.get(`/coupon/search?code=${couponCode}&page=${page}&limit=${limit}`);
};
