// Backend API response types matching the server controllers

export interface ApiResponse<T = unknown> {
  success: boolean;
  status: number;
  message?: string;
}

export interface ProductResponse extends ApiResponse {
  products: Array<import('./product').Product>;
  totalRows?: number;
}

export interface SingleProductResponse extends ApiResponse {
  product: import('./product').Product;
}

export interface CategoryResponse extends ApiResponse {
  categories: Array<import('./category').Category>;
}

export interface SingleCategoryResponse extends ApiResponse {
  category: import('./category').Category;
}

export interface ReviewResponse extends ApiResponse {
  reviews: Array<import('./review').Review>;
  stats?: Array<{ _id: number; count: number }>;
}

export interface SingleReviewResponse extends ApiResponse {
  review: import('./review').Review;
}

export interface CommentResponse extends ApiResponse {
  comments: Array<import('./comment').Comment>;
}

export interface SingleCommentResponse extends ApiResponse {
  comment: import('./comment').Comment;
}

export interface UserResponse extends ApiResponse {
  user: import('./user').User;
}

export interface UsersResponse extends ApiResponse {
  users: Array<import('./user').User>;
  totalRows?: number;
}

export interface BrandResponse extends ApiResponse {
  brands: Array<import('./product').Brand>;
}

export interface AuthResponse extends ApiResponse {
  data?: {
    user: import('./user').User;
    token: string;
  };
  user?: import('./user').User;
  token?: string;
}

export interface OrderResponse extends ApiResponse {
  order: import('./order').Order;
}

export interface OrdersResponse extends ApiResponse {
  orders: Array<import('./order').Order>;
  totalRows?: number;
}

export interface CouponResponse extends ApiResponse {
  coupon: import('./coupon').Coupon;
}

export interface CouponsResponse extends ApiResponse {
  coupons: Array<import('./coupon').Coupon>;
}

export interface ValidateCouponResponse extends ApiResponse {
  valid: boolean;
  discount?: number;
}

export interface PaymentUrlResponse extends ApiResponse {
  vnpUrl: string;
  transactionNo?: string;
}

