import { create } from 'zustand';
import { api } from '@/lib/api';

export interface Category {
  _id: string;
  name: string;
  subcategories?: Category[];
}

export interface Brand {
  _id: string;
  name: string;
}

interface AppState {
  categories: Category[];
  brands: Brand[];
  isLoading: boolean;
  hideSidebar: boolean;
  setCategories: (categories: Category[]) => void;
  setBrands: (brands: Brand[]) => void;
  setIsLoading: (status: boolean) => void;
  setHideSidebar: (status: boolean) => void;
  fetchCategories: () => Promise<void>;
  fetchBrands: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  categories: [],
  brands: [],
  isLoading: false,
  hideSidebar: false,

  setCategories: (categories) => set({ categories }),
  setBrands: (brands) => set({ brands }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setHideSidebar: (hideSidebar) => set({ hideSidebar }),

  fetchCategories: async () => {
    try {
      const response = await api.get<{ categories: Category[] }>('/category');
      if (response.success && response.data) {
        set({ categories: response.data.categories });
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },

  fetchBrands: async () => {
    try {
      const response = await api.get<{ brands: Brand[] }>('/product/brand');
      if (response.success && response.data) {
        set({ brands: response.data.brands });
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  },
})); 