import axiosConfig from './axios-config';

export const fetchReviewByProductId = async (productId: string) => {
  return await axiosConfig.get('/review/product/' + productId);
};
