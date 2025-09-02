/**
 * Format Vietnamese currency
 */
export const formatVNDPrice = (price: number): string => {
  return price.toLocaleString("vi-VN") + "đ";
};

/**
 * Calculate discount percentage
 */
export const calculateDiscountPercentage = (originalPrice: number, currentPrice: number): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

/**
 * Format discount amount in thousands
 */
export const formatDiscountAmount = (originalPrice: number, currentPrice: number): string => {
  const discount = originalPrice - currentPrice;
  return Math.round(discount / 1000) + "K";
};

/**
 * Check if product is in stock
 */
export const isProductInStock = (available: number): boolean => {
  return available > 0;
};

/**
 * Generate product URL slug
 */
export const generateProductSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Vietnamese phone number
 */
export const isValidVNPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(0|\+84)[3-9]\d{8}$/;
  return phoneRegex.test(phone);
};
