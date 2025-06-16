import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useUserStore } from '@/store';
import { LoginValues, RegisterValues } from '@/store';
import { APP_ROUTES } from '@/utils/app-config';

const useUser = () => {
  const {
    user: adminDetail,
    login,
    register,
    isAuthenticated,
  } = useUserStore();

  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [totalUserByTime] = useState<number>(0);

  const handleLogin = async (formData: LoginValues) => {
    try {
      await login(formData);
      if (isAuthenticated && adminDetail?.role !== 'user') {
        enqueueSnackbar('Login successful', { variant: 'success' });
        return true;
      } else {
        enqueueSnackbar('You do not have permission to access the admin panel', {
          variant: 'warning',
        });
        return false;
      }
    } catch (error) {
      enqueueSnackbar((error as Error).message, { variant: 'error' });
      return false;
    }
  };

  const handleRegister = async (formData: RegisterValues) => {
    try {
      await register(formData);
      enqueueSnackbar('Registration successful', { variant: 'success' });
      return true;
    } catch (error) {
      enqueueSnackbar((error as Error).message, { variant: 'error' });
      return false;
    }
  };

  const handleLogout = () => {
    useUserStore.getState().logout();
    window.location.href = APP_ROUTES.LOGIN;
  };

  // Note: These functions would need to be implemented in the admin panel
  // They are not needed in the client app
  const getAllUser = async () => {};
  const updateEditUser = async () => {};
  const searchUser = async () => {};
  const filterUser = async () => {};
  const getTotalUserByTime = async () => {};

  return {
    adminDetail,
    handleLogin,
    handleRegister,
    getAllUser,
    updateEditUser,
    handleLogout,
    searchUser,
    filterUser,
    page,
    setPage,
    limit,
    setLimit,
    totalUserByTime,
    getTotalUserByTime,
  };
};

export default useUser;
