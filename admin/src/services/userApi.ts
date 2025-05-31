import { EditUserType, IUser } from './../types/user';
import axiosConfig from './axios-config';

export const fetchAllUser = async (page?: number | string, limit?: number | string) => {
  if (!page) page = '';
  if (!limit) limit = '';

  return await axiosConfig.get(`/user?page=${page}&limit=${limit}`);
};

export const updateUser = async (userId: string, data: EditUserType) => {
  return axiosConfig.put(`/user/change/${userId}`, data);
};
export const fetchAdminDetail = async () => {
  return axiosConfig.get('/user/detail');
};

export const searchingUser = async (key: string, value: string, page?: number, limit?: number) => {
  return await axiosConfig.get(`/user/search?${key}=${value}&page=${page}&limit=${limit}`);
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string,
) => {
  return await axiosConfig.put('/auth/password/change', {
    currentPassword,
    newPassword,
    confirmNewPassword,
  });
};

export const filterUserService = async (
  role: string,
  status: string,
  page?: number,
  limit?: number,
) => {
  return await axiosConfig.get(
    `/user/filter?${role !== 'all' ? 'role=' + role : ''}&${
      status !== 'all' ? 'status=' + status : ''
    }&page=${page}&limit=${limit}`,
  );
};

export const filterUser = async (role: string, status: string) => {
  return await axiosConfig.get('/user/filter', {
    params: {
      role: role,
      status: status,
    },
  });
};

export const updateUserInfor = async (userId: string, data: IUser) => {
  return axiosConfig.put(`/user/${userId}`, data);
};

export const fetchTotalUserByTime = async (time: string) => {
  return axiosConfig.get(`/user/total?limit=${time}`);
};
