import { FormDataType } from 'types/product';
import { ForgotPasswordFormDataType, LoginValuesType, RegisterValueType } from 'types/user';
import axiosConfig from './axios-config';

export const fetchAllCategories = async () => {
  return await axiosConfig.get('/category');
};
export const login = (data: LoginValuesType) => {
  return axiosConfig.post('/auth/login', data);
};
export const registration = (data: RegisterValueType) => {
  return axiosConfig.post('auth/register', data);
};
export const sendMailToResetPassword = (formData: ForgotPasswordFormDataType) => {
  const { email, username } = formData;
  return axiosConfig.post('auth/forgot', {
    email,
    username,
  });
};
export const uploadFile = async (data: FormDataType) => {
  return await axiosConfig.post('/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const deleteFile = async (public_id: string) => {
  return await axiosConfig.delete('/upload', {
    data: { public_id: public_id },
  });
};
