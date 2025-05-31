import { ProductFormDataType } from 'types/product';
import axiosConfig from './axios-config';

export const addNewProduct = async (formData: ProductFormDataType) => {
  return await axiosConfig.post('/product', formData);
};

export const validateProductCode = async (code: string) => {
  return await axiosConfig.get(`/product/check-upc/?code=${code}`);
};

export const fetchAllProduct = async (page?: number | string, limit?: number | string) => {
  if (!page) page = '';
  if (!limit) limit = '';

  return await axiosConfig.get(`/product/admin?page=${page}&limit=${limit}`);
};

export const fetchAllBrands = async () => {
  return await axiosConfig.get('/product/brand');
};

export const fetchProductById = async (productId: string) => {
  return await axiosConfig.get('/product/' + productId);
};

export const editProduct = async (productId: string, formData: ProductFormDataType) => {
  return await axiosConfig.put('/product/' + productId, formData);
};

export const changeProductStatus = async (productId: string) => {
  return await axiosConfig.put('/product/status/' + productId);
};

export const fetchReviewByProductId = async (productId: string) => {
  return await axiosConfig.get('/review/product/' + productId);
};

export const fetchTotalProductRevenue = async (productId: string) => {
  return await axiosConfig.get('/order/revenue-product/' + productId);
};

export const fetchBestSellingProduct = async (limit: number) => {
  return await axiosConfig.get(`/product/best-selling/?limit=${limit}`);
};

export const fetchNewestProduct = async (limit: number) => {
  return await axiosConfig.get(`/product?limit=${limit}`);
};

export const fetchTotalProductByTime = async (time: string) => {
  return await axiosConfig.get(`/product/total?limit=${time}`);
};

export const searchingProduct = async (
  code: string,
  name: string,
  page?: number,
  limit?: number,
) => {
  return await axiosConfig.get(
    `/product/search?name=${name}&code=${code}&page=${page}&limit=${limit}`,
  );
};

export const filterProductService = async (query: string) => {
  return await axiosConfig.get(`/product/filter?${query}`);
};
