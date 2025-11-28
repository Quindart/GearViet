import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enAuth from './locales/en/pages/auth.json';
import enDashboard from './locales/en/pages/dashboard.json';
import enProducts from './locales/en/pages/products.json';
import enOrders from './locales/en/pages/orders.json';
import enUsers from './locales/en/pages/users.json';
import enCategories from './locales/en/pages/categories.json';
import enCoupons from './locales/en/pages/coupons.json';
import enProfile from './locales/en/pages/profile.json';
import enCommon from './locales/en/shared/common.json';
import enNavbar from './locales/en/shared/navbar.json';
import enSidebar from './locales/en/shared/sidebar.json';

import viAuth from './locales/vi/pages/auth.json';
import viDashboard from './locales/vi/pages/dashboard.json';
import viProducts from './locales/vi/pages/products.json';
import viOrders from './locales/vi/pages/orders.json';
import viUsers from './locales/vi/pages/users.json';
import viCategories from './locales/vi/pages/categories.json';
import viCoupons from './locales/vi/pages/coupons.json';
import viProfile from './locales/vi/pages/profile.json';
import viCommon from './locales/vi/shared/common.json';
import viNavbar from './locales/vi/shared/navbar.json';
import viSidebar from './locales/vi/shared/sidebar.json';

const resources = {
  en: {
    'pages/auth': enAuth,
    'pages/dashboard': enDashboard,
    'pages/products': enProducts,
    'pages/orders': enOrders,
    'pages/users': enUsers,
    'pages/categories': enCategories,
    'pages/coupons': enCoupons,
    'pages/profile': enProfile,
    'shared/common': enCommon,
    'shared/navbar': enNavbar,
    'shared/sidebar': enSidebar,
  },
  vi: {
    'pages/auth': viAuth,
    'pages/dashboard': viDashboard,
    'pages/products': viProducts,
    'pages/orders': viOrders,
    'pages/users': viUsers,
    'pages/categories': viCategories,
    'pages/coupons': viCoupons,
    'pages/profile': viProfile,
    'shared/common': viCommon,
    'shared/navbar': viNavbar,
    'shared/sidebar': viSidebar,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'vi',
    fallbackLng: 'en',
    defaultNS: 'shared/common',
    ns: [
      'pages/auth',
      'pages/dashboard',
      'pages/products',
      'pages/orders',
      'pages/users',
      'pages/categories',
      'pages/coupons',
      'pages/profile',
      'shared/common',
      'shared/navbar',
      'shared/sidebar',
    ],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

