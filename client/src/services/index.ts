// Auth services
export {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  resetPassword,
} from './authService';

// Product services
export {
  getAllProducts,
  getProductById,
  searchProducts,
  filterProducts,
  getNewestProducts,
  getBestSellingProducts,
  getProductsBySubcategory,
  getAllBrands,
  checkBrandExists,
} from './productApi';

// Review services
export {
  fetchReviewByProductId,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from './reviewApi';

// Category services
export {
  getAllCategories,
  getCategoryById,
  getAllSubcategories,
  getSubcategoryById,
  getSubcategoriesByCategoryId,
} from './categoryApi';

// Upload services
export {
  uploadFile,
  uploadFiles,
  uploadImage,
} from './uploadApi';

// Order services
export {
  getUserOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  cancelOrder,
  getOrderRevenue,
} from './orderApi';

// User services
export {
  fetchTotalUserByTime,
} from './userApi';

// Shipping services
export {
  fetchAllProvinces,
  fetchAllDistrictByProvince,
  fetchAllWardByDistrict,
  getAvailableShippingServices,
  calculateShippingFee,
  createShippingOrder,
  getShippingOrderDetails,
  cancelShippingOrder,
} from './shippingApi';