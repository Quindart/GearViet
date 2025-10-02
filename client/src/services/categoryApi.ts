import { api } from "@/lib/api";

export interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subcategory {
  id: number;
  name: string;
  description?: string;
  categoryId: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get all categories
 */
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const result = await api.get<Category[]>('/category');
    return result.data || [];
  } catch (error) {
    console.error("Get categories error:", error);
    return [];
  }
};

/**
 * Get category by ID
 */
export const getCategoryById = async (categoryId: string | number): Promise<Category | null> => {
  try {
    const result = await api.get<Category>(`/category/${categoryId}`);
    return result.data || null;
  } catch (error) {
    console.error("Get category by ID error:", error);
    return null;
  }
};

/**
 * Get all subcategories
 */
export const getAllSubcategories = async (): Promise<Subcategory[]> => {
  try {
    const result = await api.get<Subcategory[]>('/category/subcategory');
    return result.data || [];
  } catch (error) {
    console.error("Get subcategories error:", error);
    return [];
  }
};

/**
 * Get subcategory by ID
 */
export const getSubcategoryById = async (subcategoryId: string | number): Promise<Subcategory | null> => {
  try {
    const result = await api.get<Subcategory>(`/category/subcategory/${subcategoryId}`);
    return result.data || null;
  } catch (error) {
    console.error("Get subcategory by ID error:", error);
    return null;
  }
};

/**
 * Get subcategories by category ID
 */
export const getSubcategoriesByCategoryId = async (categoryId: string | number): Promise<Subcategory[]> => {
  try {
    const result = await api.get<Subcategory[]>(`/category/${categoryId}/subcategories`);
    return result.data || [];
  } catch (error) {
    console.error("Get subcategories by category ID error:", error);
    return [];
  }
};
