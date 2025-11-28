import { api } from "@/lib/api";
import { Product, Brand, FilterProductParams } from "@/types/product";
import { ProductResponse, SingleProductResponse, BrandResponse } from "@/types/api-response";

/**
 * Get all products
 */
export const getAllProducts = async (
  params?: { page?: number; limit?: number }
): Promise<Product[]> => {
  try {
    const queryParams = params ? new URLSearchParams(
      Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)])
    ).toString() : "";
    const url = queryParams ? `/product?${queryParams}` : "/product";

    const result = await api.get<ProductResponse>(url);
    return result.products || [];
  } catch (error) {
    console.error("Get all products error:", error);
    return [];
  }
};

/**
 * Search products
 */
export const searchProduct = async (query: string): Promise<Product[]> => {
  try {
    const result = await api.get<ProductResponse>(`/product/search?q=${encodeURIComponent(query)}`);
    return result.products || [];
  } catch (error) {
    console.error("Search product error:", error);
    return [];
  }
};

/**
 * Filter products
 */
export const filterProduct = async (params: FilterProductParams): Promise<Product[]> => {
  try {
    const queryParams = new URLSearchParams(
      Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [key, Array.isArray(value) ? value.join(",") : String(value)])
    ).toString();
    const url = queryParams ? `/product/filter?${queryParams}` : "/product/filter";
    const result = await api.get<ProductResponse>(url);
    return result.products || [];
  } catch (error) {
    console.error("Filter product error:", error);
    return [];
  }
};

/**
 * Get newest products
 */
export const getNewestProducts = async (limit?: number): Promise<Product[]> => {
  try {
    const url = limit ? `/product/newest?limit=${limit}` : "/product/newest";
    const result = await api.get<ProductResponse>(url);
    return result.products || [];
  } catch (error) {
    console.error("Get newest products error:", error);
    return [];
  }
};

/**
 * Get best selling products
 */
export const getBestSellingProducts = async (limit?: number): Promise<Product[]> => {
  try {
    const url = limit ? `/product/best-selling?limit=${limit}` : "/product/best-selling";
    const result = await api.get<ProductResponse>(url);
    return result.products || [];
  } catch (error) {
    console.error("Get best selling products error:", error);
    return [];
  }
};

/**
 * Get product by ID
 */
export const getProductById = async (productId: string): Promise<Product | null> => {
  try {
    console.log("getProductById - Fetching:", productId);
    const result = await api.get<SingleProductResponse>(`/product/${productId}`);
    console.log("getProductById - Full result:", JSON.stringify(result, null, 2));
    
    // Check if result has product field
    if (result && 'product' in result) {
      console.log("getProductById - result.product:", result.product);
      const product = result.product || null;
      console.log("getProductById - Returning:", product);
      return product;
    } else {
      console.error("getProductById - Result does not have product field:", result);
      return null;
    }
  } catch (error) {
    console.error("Get product by ID error:", error);
    return null;
  }
};

/**
 * Get products by subcategory
 */
export const getProductsBySubcategory = async (
  subcategoryId: string,
  params?: { page?: number; limit?: number }
): Promise<Product[]> => {
  try {
    const queryParams = params ? new URLSearchParams(
      Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)])
    ).toString() : "";
    const url = queryParams
      ? `/product/subcategory/${subcategoryId}?${queryParams}`
      : `/product/subcategory/${subcategoryId}`;
    const result = await api.get<ProductResponse>(url);
    return result.products || [];
  } catch (error) {
    console.error("Get products by subcategory error:", error);
    return [];
  }
};

/**
 * Get all brands
 */
export const getAllBrands = async (): Promise<Brand[]> => {
  try {
    const result = await api.get<BrandResponse>("/product/brand");
    return result.brands || [];
  } catch (error) {
    console.error("Get all brands error:", error);
    return [];
  }
};

