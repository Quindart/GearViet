export const APP_ROUTES = {
  INDEX: '/',
  PROFILE: '/profile',

  // product
  PRODUCT: '/products',
  ALL_PRODUCT: '/products/all',
  ADD_NEW: '/products/new',
  PRODUCT_DETAIL: '/products/:productId',
  EDIT_PRODUCT: '/products/edit',

  //order
  ORDER: '/orders',
  ALL_ORDER: '/orders/all',
  ORDER_DETAIL: '/order/detail/:orderId',

  //User
  USER: '/users',
  ALL_USER: '/users/all',
  USER_DETAIL: '/users/:userId',
  CATEGORIES: '/categories',

  //Coupon
  COUPON: '/coupons',
  ALL_COUPON: '/coupons/all',

  //auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgotpassword',
  SUCCESS_MESSAGE: '/auth/successmessage',
  NOT_FOUND: '/404',

  //warehouse
  WAREHOUSE: '/warehouse',
};

export const APP_SIDEBAR = [
  {
    text: 'Home',
    section: 'home',
    icon: 'bx:home-alt',
    link: APP_ROUTES.INDEX,
    roles: ['admin', 'owner', 'mod', 'warehouse'],
  },

  {
    section: 'categories',
    icon: 'material-symbols:list-alt-outline-rounded',
    text: 'Category management',
    link: APP_ROUTES.CATEGORIES,
    roles: ['admin', 'owner', 'mod'],
  },
  {
    section: 'Products',
    icon: 'icon-park-outline:ad-product',
    text: 'Product management',
    roles: ['admin', 'owner', 'mod'],
    link: [APP_ROUTES.ALL_PRODUCT, APP_ROUTES.ADD_NEW],
    children: [
      {
        section: 'all_products',
        text: 'All product',
        link: APP_ROUTES.ALL_PRODUCT,
        key: '/products/all',
      },
      {
        section: 'add_new',
        text: 'Add product',
        link: APP_ROUTES.ADD_NEW,
        key: '/products/new',
      },
    ],
  },
  {
    section: 'order_management',
    icon: 'icon-park-outline:transaction-order',
    text: 'Order management',
    roles: ['admin', 'owner', 'mod', 'warehouse'],
    link: [APP_ROUTES.ALL_ORDER],

    children: [
      {
        section: 'all_order',
        text: 'All order',
        link: APP_ROUTES.ALL_ORDER,
        key: '/orders/all',
      },
    ],
  },
  {
    section: 'Users',
    icon: 'ri:account-circle-line',
    text: 'User management',
    roles: ['owner', 'admin'],
    link: [APP_ROUTES.ALL_USER],
    children: [
      {
        section: 'all_user',
        text: 'All user',
        link: APP_ROUTES.ALL_USER,
        key: 'users/all',
      },
    ],
  },
  {
    section: 'Coupons',
    icon: 'ri:account-circle-line',
    text: 'Coupon management',
    roles: ['owner'],
    link: [APP_ROUTES.ALL_COUPON],

    children: [
      {
        section: 'all_coupons',
        text: 'All coupon',
        link: APP_ROUTES.ALL_COUPON,
        key: 'coupons/all',
      },
    ],
  },
  {
    section: 'warehouses',
    icon: 'ic:twotone-warehouse',
    text: 'Warehouse management',
    link: APP_ROUTES.WAREHOUSE,
    roles: ['admin', 'owner', 'warehouse'],
  },
];

export const APP_PROFILE_MENU = [
  // {
  //   text: 'Profile',
  //   icon: 'mdi:account-circle',
  //   link: '#',
  // },
  {
    text: 'Message',
    icon: 'mdi:message-text-outline',
    link: '#',
  },
  {
    text: 'Help',
    icon: 'mdi:lifebuoy',
    link: '#',
  },
  {
    text: 'Setting',
    icon: 'mdi:cog-outline',
    link: '#',
  },
];

export const DISCOUNT_OPTIONS = ['50%', '40%', '30%', '20%', '10%'];
export const RATING_OPTIONS = [5, 4, 3, 2, 1];

export const renderType = {
  ALL: 'all',
  FILTER: 'filter',
  SEARCH: 'search',
};
