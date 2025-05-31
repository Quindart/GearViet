import axiosConfig from './axios-config';
// import { Categories } from './../types/index';

export const fetchAllProvinces = async () => {
  return await axiosConfig.get('/shipping/master-data/province');
};

export const fetchAllDistrictByProvince = async (provinceId: number) => {
  return await axiosConfig.get(`/shipping/master-data/district?province_id=${provinceId}`);
};

export const fetchAllWardByDistrict = async (districtId: number) => {
  return await axiosConfig.get(`/shipping/master-data/ward?district_id=${districtId}`);
};
