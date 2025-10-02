import { api } from "@/lib/api";

export interface ProductListResponse {
  products: Array<{
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    images: string[];
    rating: number;
    reviewCount: number;
    brand: string;
    slug: string;
  }>;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  brand: string;
  category: string;
  inStock: boolean;
  warranty: string;
  features: string[];
  specifications: Record<string, string>;
  tags: string[];
}

/**
 * Get all products with pagination
 */
export const getAllProducts = async (params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}): Promise<ProductListResponse> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);

    const result = await api.get<ProductListResponse>(`/product?${queryParams.toString()}`);
    return result.data || { products: [], pagination: { currentPage: 1, totalPages: 1, totalItems: 0, limit: 10 } };
  } catch (error) {
    console.error("Get products error:", error);
    return { products: [], pagination: { currentPage: 1, totalPages: 1, totalItems: 0, limit: 10 } };
  }
};

/**
 * Get product by ID
 */
export const getProductById = async (productId: string | number): Promise<Product | null> => {
  try {
    const result = await api.get<Product>(`/product/${productId}`);
    return result.data || null;
  } catch (error) {
    console.error("Get product by ID error:", error);
    return null;
  }
};

/**
 * Search products
 */
export const searchProducts = async (params: {
  name?: string;
  code?: string;
  page?: number;
  limit?: number;
}): Promise<ProductListResponse> => {
  try {
    const queryParams = new URLSearchParams();
    if (params.name) queryParams.append('name', params.name);
    if (params.code) queryParams.append('code', params.code);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const result = await api.get<ProductListResponse>(`/product/search?${queryParams.toString()}`);
    return result.data || { products: [], pagination: { currentPage: 1, totalPages: 1, totalItems: 0, limit: 10 } };
  } catch (error) {
    console.error("Search products error:", error);
    return { products: [], pagination: { currentPage: 1, totalPages: 1, totalItems: 0, limit: 10 } };
  }
};

/**
 * Filter products
 */
export const filterProducts = async (filterQuery: string): Promise<ProductListResponse> => {
  try {
    const result = await api.get<ProductListResponse>(`/product/filter?${filterQuery}`);
    return result.data || { products: [], pagination: { currentPage: 1, totalPages: 1, totalItems: 0, limit: 10 } };
  } catch (error) {
    console.error("Filter products error:", error);
    return { products: [], pagination: { currentPage: 1, totalPages: 1, totalItems: 0, limit: 10 } };
  }
};

/**
 * Get newest products
 */
export const getNewestProducts = async (limit: number = 10): Promise<Product[]> => {
  try {
    const result = await api.get<Product[]>(`/product/newest?limit=${limit}`);
    return result.data || [];
  } catch (error) {
    console.error("Get newest products error:", error);
    return [];
  }
};

/**
 * Get best selling products
 */
export const getBestSellingProducts = async (limit: number = 10): Promise<Product[]> => {
  try {
    const result = await api.get<Product[]>(`/product/best-selling?limit=${limit}`);
    return result.data || [];
  } catch (error) {
    console.error("Get best selling products error:", error);
    return [];
  }
};

/**
 * Get products by subcategory
 */
export const getProductsBySubcategory = async (subcategoryId: string | number): Promise<Product[]> => {
  try {
    const result = await api.get<Product[]>(`/product/subcategory/${subcategoryId}`);
    return result.data || [];
  } catch (error) {
    console.error("Get products by subcategory error:", error);
    return [];
  }
};

/**
 * Get all brands
 */
export const getAllBrands = async (): Promise<string[]> => {
  try {
    const result = await api.get<string[]>('/product/brand');
    return result.data || [];
  } catch (error) {
    console.error("Get brands error:", error);
    return [];
  }
};

/**
 * Check if brand exists
 */
export const checkBrandExists = async (brandName: string): Promise<boolean> => {
  try {
    const result = await api.get<{ exists: boolean }>(`/product/brand/check?name=${brandName}`);
    return result.data?.exists || false;
  } catch (error) {
    console.error("Check brand exists error:", error);
    return false;
  }
};
