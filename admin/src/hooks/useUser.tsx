import { AxiosError, isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { login, registration } from 'services/appApi';
import {
  fetchAllUser,
  fetchAdminDetail,
  updateUser,
  searchingUser,
  filterUserService,
} from 'services/userApi';
import { RootState } from 'store';
import {
  setTotalRows,
  setAdminDetail,
  setUserList,
  setUserRenderType,
} from 'store/slices/userSlice';
import { ResponseType } from 'types';
import { Role } from 'types/enum';
import { EditUserType, IUser, LoginValuesType, RegisterValueType } from 'types/user';
import { removeValueInLocalStorage, setValueInLocalStorage } from 'utils/helper';
import useApp from './useApp';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES, renderType } from 'utils/app-config';
import { useState } from 'react';
import { fetchTotalUserByTime } from '../services/userApi';

const useUser = () => {
  const adminDetail = useSelector((state: RootState) => state.user.adminDetail);
  const userList = useSelector((state: RootState) => state.user.userList);
  const totalRows = useSelector((state: RootState) => state.user.totalRows);
  const dispatch = useDispatch();
  const { setIsLoading } = useApp();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [totalUserByTime, setTotalUserByTime] = useState<number>(0);

  const handleLogin = (formData: LoginValuesType) => {
    setIsLoading(true);
    const result = login(formData)
      .then((res: ResponseType) => {
        if (res && res.success) {
          if (res?.user && res?.user.role !== Role.USER) {
            enqueueSnackbar('Đăng nhập thành công', { variant: 'success' });
            dispatch(setAdminDetail(res?.user));
            setValueInLocalStorage('access_token', res?.token ? res?.token : '');
            return true;
          } else {
            setIsLoading(false);
            enqueueSnackbar('Bạn không có quyền truy cập vào trang quản lý', {
              variant: 'warning',
            });
            return false;
          }
        }
      })
      .catch((error: AxiosError) => {
        setIsLoading(false);
        enqueueSnackbar(error.message, { variant: 'error' });
        return false;
      });

    return result;
  };

  const handleRegister = (formData: RegisterValueType) => {
    setIsLoading(true);
    const result = registration(formData)
      .then((res: ResponseType) => {
        if (res && res.success) {
          setIsLoading(false);
          enqueueSnackbar('Đăng ký thành công', { variant: 'success' });
          return true;
        }
      })
      .catch((error: AxiosError) => {
        setIsLoading(false);
        enqueueSnackbar(error.message, { variant: 'error' });
        return false;
      });
    return result;
  };

  const getAdminDetail = async () => {
    try {
      const res: ResponseType = await fetchAdminDetail();
      if (res.success && res.user) {
        dispatch(setAdminDetail(res.user));
        return;
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.message);
      }
    }
  };

  const getAllUser = async (page?: number, limit?: number) => {
    dispatch(setUserList([]));

    try {
      const res: ResponseType = await fetchAllUser(page, limit);
      if (res.success && res.users && res.totalRows) {
        const userList = res.users;
        dispatch(setUserList(userList));
        dispatch(setUserRenderType(renderType.ALL));
        dispatch(setTotalRows(res.totalRows));
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.message);
      }
    }
  };

  const updateEditUser = async (id: string, data: EditUserType) => {
    try {
      const res: ResponseType = await updateUser(id, data);
      if (res.success && res.role && res.userStatus) {
        enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
        const newUserList: IUser[] = userList.map((user: IUser) => {
          if (user._id === id) {
            return {
              ...user,
              role: res.role as string,
              status: res.userStatus as string,
            };
          } else {
            return user;
          }
        });

        dispatch(setUserList(newUserList));
      }
    } catch (error) {
      if (isAxiosError(error)) {
        enqueueSnackbar('Cập nhật thất bại', { variant: 'error' });
      }
    }
  };

  const handleLogout = () => {
    removeValueInLocalStorage('access_token');
    navigate(APP_ROUTES.LOGIN);
  };

  const searchUser = async (key: string, value: string, page: number, limit: number) => {
    try {
      const res: ResponseType = await searchingUser(key, value, page, limit);
      if (res.success) {
        if (res.users && res.totalRows) {
          dispatch(setUserRenderType(renderType.SEARCH));
          dispatch(setUserList(res.users));
          dispatch(setTotalRows(res.totalRows));
        } else {
          dispatch(setUserList([]));
          dispatch(setTotalRows(0));
        }
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.message);
      }
    }
  };

  const filterUser = async (role: string, status: string, page: number, limit: number) => {
    try {
      const res: ResponseType = await filterUserService(role, status, page, limit);
      if (res.success) {
        if (res.users && res.totalRows) {
          dispatch(setUserRenderType(renderType.FILTER));
          dispatch(setUserList(res.users));
          dispatch(setTotalRows(res.totalRows));
        } else {
          dispatch(setUserList([]));
          dispatch(setTotalRows(0));
        }
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.message);
      }
    }
  };

  const getTotalUserByTime = async (time: string) => {
    try {
      const response: ResponseType = await fetchTotalUserByTime(time);
      if (response.success && response.total) {
        setTotalUserByTime(response.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    adminDetail,
    handleLogin,
    getAdminDetail,
    handleRegister,
    getAllUser,
    totalRows,
    userList,
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
