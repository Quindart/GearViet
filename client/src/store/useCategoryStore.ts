import { create } from 'zustand';
import { api } from '@/lib/api';

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  subcategories: Subcategory[];
  createdAt: string;
  updatedAt: string;
}

interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCategories: () => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  updateCategory: (categoryId: string, name: string) => Promise<void>;
  deleteCategory: (categoryId: string) => Promise<void>;
  addSubcategory: (categoryId: string, name: string) => Promise<void>;
  updateSubcategory: (subcategoryId: string, name: string) => Promise<void>;
  deleteSubcategory: (subcategoryId: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  selectedCategory: null,
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    try {
      set({ isLoading: true });
      const response = await api.get<{ categories: Category[] }>('/categories');
      if (response.success && response.data) {
        set({ categories: response.data.categories, error: null });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  addCategory: async (name: string) => {
    try {
      set({ isLoading: true });
      const response = await api.post<{ category: Category }>('/categories', { name });
      if (response.success && response.data) {
        const categories = [...get().categories, response.data!.category];
        set({ categories, error: null });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateCategory: async (categoryId: string, name: string) => {
    try {
      set({ isLoading: true });
      const response = await api.put<{ category: Category }>(
        `/categories/${categoryId}`,
        { name }
      );
      if (response.success && response.data) {
        const categories = get().categories.map(category =>
          category._id === categoryId ? response.data!.category : category
        );
        set({ categories, error: null });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteCategory: async (categoryId: string) => {
    try {
      set({ isLoading: true });
      const response = await api.delete<{ success: boolean }>(`/categories/${categoryId}`);
      if (response.success) {
        const categories = get().categories.filter(category => category._id !== categoryId);
        set({ categories, error: null });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  addSubcategory: async (categoryId: string, name: string) => {
    try {
      set({ isLoading: true });
      const response = await api.post<{ category: Category }>(
        `/categories/${categoryId}/subcategories`,
        { name }
      );
      if (response.success && response.data) {
        const categories = get().categories.map(category =>
          category._id === categoryId ? response.data!.category : category
        );
        set({ categories, error: null });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateSubcategory: async (subcategoryId: string, name: string) => {
    try {
      set({ isLoading: true });
      const response = await api.put<{ category: Category }>(
        `/categories/subcategories/${subcategoryId}`,
        { name }
      );
      if (response.success && response.data) {
        const categories = get().categories.map(category => {
          const subcategories = category.subcategories.map(subcategory =>
            subcategory._id === subcategoryId
              ? { ...subcategory, name }
              : subcategory
          );
          return { ...category, subcategories };
        });
        set({ categories, error: null });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSubcategory: async (subcategoryId: string) => {
    try {
      set({ isLoading: true });
      const response = await api.delete<{ success: boolean }>(
        `/categories/subcategories/${subcategoryId}`
      );
      if (response.success) {
        const categories = get().categories.map(category => ({
          ...category,
          subcategories: category.subcategories.filter(
            subcategory => subcategory._id !== subcategoryId
          ),
        }));
        set({ categories, error: null });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
})); 