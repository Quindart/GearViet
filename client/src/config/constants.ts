/**
 * Application configuration constants
 */

export const APP_CONFIG = {
  // App meta
  APP_NAME: "GearViet",
  APP_DESCRIPTION: "Thế Giới Gaming hàng đầu Việt Nam",
  
  // Contact info
  HOTLINE: "02899998399",
  EMAIL: "contact@gearviet.com",
  
  // Business hours
  BUSINESS_HOURS: "T2 - CN 9:00 AM - 20:00 PM",
  
  // Pagination
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
  
  // Product
  MAX_PRODUCT_IMAGES: 5,
  MIN_PRODUCT_PRICE: 1000,
  MAX_PRODUCT_PRICE: 100000000,
  
  // Cart
  MAX_CART_QUANTITY: 99,
  MIN_CART_QUANTITY: 1,
  
  // URLs
  SOCIAL_MEDIA: {
    FACEBOOK: "https://facebook.com/gearviet",
    INSTAGRAM: "https://instagram.com/gearviet",
    YOUTUBE: "https://youtube.com/gearviet",
  },
  
  // File upload
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
} as const;

export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/products/[slug]",
  CART: "/cart",
  CHECKOUT: "/checkout",
  PROFILE: "/profile",
  ORDERS: "/orders",
  LOGIN: "/login",
  REGISTER: "/register",
  SEARCH: "/search",
  CATEGORY: "/category/[slug]",
  BRAND: "/brand/[slug]",
} as const;

export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  REFRESH: "/auth/refresh",
  LOGOUT: "/auth/logout",
  
  // Products
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/products/:id",
  SEARCH_PRODUCTS: "/products/search",
  CATEGORIES: "/categories",
  BRANDS: "/brands",
  
  // Cart & Orders
  CART: "/cart",
  ORDERS: "/orders",
  CHECKOUT: "/checkout",
  
  // User
  PROFILE: "/user/profile",
  UPDATE_PROFILE: "/user/profile",
  CHANGE_PASSWORD: "/user/change-password",
} as const;
