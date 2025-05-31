import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ResponseType } from 'types';
import { APP_ROUTES } from 'utils/app-config';
import { getValueFromLocalStorage, removeValueInLocalStorage } from 'utils/helper';

const axiosConfig = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:8000', // host
  // baseURL: process.env.REACT_APP_BASE_URL || 'http://139.180.207.224:1234', // host
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:5000', // host
  timeout: 30000,
  headers: {
    'Context-Type': 'application/json',
  },
});

axiosConfig.interceptors.request.use(
  function (request: AxiosRequestConfig) {
    const access_token: string = getValueFromLocalStorage('access_token') || '';
    if (request.headers) {
      request.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return request;
  },
  function (error: AxiosError) {
    console.log(error);
    alert;
    return error;
  },
);
axiosConfig.interceptors.response.use(
  function (response: AxiosResponse) {
    if (response && response.data) {
      return response.data;
    }
  },
  function (error: AxiosError<ResponseType>) {
    if (error.code === 'ECONNABORTED') {
      removeValueInLocalStorage('access_token');
      window.location.assign('http://localhost:5000' + APP_ROUTES.LOGIN);
      return;
    }
    if (error && error?.response?.data.msg === 'Unauthenticated') {
      removeValueInLocalStorage('access_token');
      window.location.assign('http://localhost:5000' + APP_ROUTES.LOGIN);
      return;
    }

    if (error && error?.response?.data.msg === 'Unauthorized') {
      window.location.assign('http://localhost:5000/404');
    }
    return Promise.reject(error?.response?.data);
  },
);

export default axiosConfig;
