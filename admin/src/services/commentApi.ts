import axiosConfig from './axios-config';

export const fetchCommentByProductId = async (productId: string) => {
  return await axiosConfig.get('/comment/product/' + productId);
};

export const replyComment = async (
  commentId: string,
  content: string,
  personName: string | undefined,
) => {
  if (!personName) personName = '';
  return await axiosConfig.put('/comment/reply/' + commentId, { personName, content });
};
