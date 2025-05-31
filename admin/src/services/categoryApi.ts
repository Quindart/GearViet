import axiosConfig from './axios-config';
// import { Categories } from './../types/index';

export const fetchAllCategories = async () => {
  return await axiosConfig.get('/category');
};

export const addCategory = async (name: string) => {
  return await axiosConfig.post('/category', { name });
};

export const addSubCategory = async (categoryId: string, name: string) => {
  return await axiosConfig.post('/category/subcategory', { categoryId, name: name });
};

export const updateCategory = async (categoryId: string, name: string) => {
  return await axiosConfig.put(`/category/${categoryId}`, { name });
};

export const updateSubcategory = async (subcategoryId: string, name: string) => {
  return await axiosConfig.put(`/category/subcategory/${subcategoryId}`, { name });
};

export const deleteCategory = async (categoryId: string) => {
  return await axiosConfig.delete(`/category/${categoryId}`);
};

export const deleteSubCategory = async (subcategoryId: string) => {
  return await axiosConfig.delete(`/category/subcategory/${subcategoryId}`);
};
