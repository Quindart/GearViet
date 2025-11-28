import { api } from "@/lib/api";
import { Category } from "@/types/category";
import { CategoryResponse, SingleCategoryResponse } from "@/types/api-response";

/**
 * Get all categories
 */
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const result = await api.get<CategoryResponse>("/category");
    return result.categories || [];
  } catch (error) {
    console.error("Get all categories error:", error);
    return [];
  }
};

/**
 * Get category by ID
 */
export const getCategoryById = async (categoryId: string): Promise<Category | null> => {
  try {
    const result = await api.get<SingleCategoryResponse>(`/category/${categoryId}`);
    return result.category || null;
  } catch (error) {
    console.error("Get category by ID error:", error);
    return null;
  }
};

