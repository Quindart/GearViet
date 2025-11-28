import AuthLayout from 'components/shared/layouts/AuthLayout/AuthLayout';
import Loading from 'components/ui/Loading';
import ForgotPasswordPage from 'pages/auth/ForgotPassword';
import LoginPage from 'pages/auth/Login';
import RegisterPage from 'pages/auth/Register';
import SuccessMessagePage from 'pages/auth/SuccessMessage';
import DashboardPage from 'pages/Dashboard';
import NotFoundPage from 'pages/NotFound';
import AllOrderPage from 'pages/order/all';
import AllProductPage from 'pages/product/all';
import ProductDetailPage from 'pages/product/detail';
import AddNewProductPage from 'pages/product/new';
import ProfilePage from 'pages/Profile';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { APP_ROUTES } from 'utils/app-config';
import PrivateRouter from './privateRouter';
import OrderDetailPage from './../pages/order/detail';
import Category from 'pages/category';
import ListAllUser from 'pages/listalluser/ListAllUser';
import ListAllCoupon from 'pages/coupon/ListAllCoupon';

const Routing: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={APP_ROUTES.INDEX} element={<PrivateRouter />}>
          <Route index element={<DashboardPage />} />
          <Route path={APP_ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={APP_ROUTES.ALL_PRODUCT} element={<AllProductPage />} />
          <Route path={APP_ROUTES.ADD_NEW} element={<AddNewProductPage />} />
          <Route path={APP_ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
          <Route path={APP_ROUTES.EDIT_PRODUCT} element={<AddNewProductPage />} />
          <Route path={APP_ROUTES.ALL_ORDER} element={<AllOrderPage />} />
          <Route path={APP_ROUTES.ORDER_DETAIL} element={<OrderDetailPage />} />
          <Route path={APP_ROUTES.CATEGORIES} element={<Category />} />
          <Route path={APP_ROUTES.ALL_USER} element={<ListAllUser />} />
          <Route path={APP_ROUTES.ALL_COUPON} element={<ListAllCoupon />} />
        </Route>
        <Route path='/auth' element={<AuthLayout />}>
          <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={APP_ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={APP_ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={APP_ROUTES.SUCCESS_MESSAGE} element={<SuccessMessagePage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default Routing;
