import axios, { AxiosResponse, AxiosError } from 'axios';
import { ResponseType } from 'types';
import { getValueFromLocalStorage } from 'utils/helper';

const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Context-Type': 'application/json',
  },
});

import type { InternalAxiosRequestConfig } from 'axios';

axiosConfig.interceptors.request.use(
  function (request: InternalAxiosRequestConfig) {
    const access_token: string = getValueFromLocalStorage('access_token') || '';
    if (request.headers) {
      request.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return request;
  },
  function (error: AxiosError) {
    // console.log(error);
    alert;
    return Promise.reject(error);
  },
);
axiosConfig.interceptors.response.use(
  function (response: AxiosResponse) {
    if (response && response.data) {
      return response.data;
    }
  },
  function (error: AxiosError<ResponseType>) {
    // if (error.code === 'ECONNABORTED') {
    //   removeValueInLocalStorage('access_token');
    //   window.location.assign('https://gearvietserver.onrender.com' + APP_ROUTES.LOGIN);
    //   return;
    // }
    // if (error && error?.response?.data.msg === 'Unauthenticated') {
    //   removeValueInLocalStorage('access_token');
    //   window.location.assign('https://gearvietserver.onrender.com' + APP_ROUTES.LOGIN);
    //   return;
    // }

    // if (error && error?.response?.data.msg === 'Unauthorized') {
    //   window.location.assign('https://gearvietserver.onrender.com/404');
    // }
    return Promise.reject(error?.response?.data);
  },
);

export default axiosConfig;
