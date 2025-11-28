import axiosConfig from './axios-config';

export const fetchReviewByProductId = async (productId: string) => {
  return await axiosConfig.get('/api/review/product/' + productId);
};
