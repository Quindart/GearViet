import { create } from 'zustand';
import { api } from '@/lib/api';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand?: string;
  stock: number;
  rating: number;
  numReviews: number;
  isPublished: boolean;
}

export interface Review {
  _id: string;
  user: string;
  product: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  reviews: Review[];
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;

  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  setReviews: (reviews: Review[]) => void;
  setIsLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
  setPage: (page: number) => void;

  fetchProducts: (page?: number, limit?: number) => Promise<void>;
  fetchProductById: (productId: string) => Promise<void>;
  fetchProductReviews: (productId: string) => Promise<void>;
  fetchBestSelling: (limit: number) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  selectedProduct: null,
  reviews: [],
  totalPages: 1,
  currentPage: 1,
  isLoading: false,
  error: null,

  setProducts: (products) => set({ products }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setReviews: (reviews) => set({ reviews }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setPage: (currentPage) => set({ currentPage }),

  fetchProducts: async (page = 1, limit = 10) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get<{
        products: Product[];
        totalPages: number;
        currentPage: number;
      }>(`/product?page=${page}&limit=${limit}`);
      
      if (response.success && response.data) {
        const { products, totalPages, currentPage } = response.data;
        set({ products, totalPages, currentPage, isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchProductById: async (productId) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get<{ product: Product }>(`/product/${productId}`);
      
      if (response.success && response.data) {
        set({ selectedProduct: response.data.product, isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchProductReviews: async (productId) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get<{ reviews: Review[] }>(`/review/product/${productId}`);
      
      if (response.success && response.data) {
        set({ reviews: response.data.reviews, isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchBestSelling: async (limit) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get<{ products: Product[] }>(`/product/best-selling?limit=${limit}`);
      
      if (response.success && response.data) {
        set({ products: response.data.products, isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  searchProducts: async (query) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get<{ products: Product[] }>(`/product/search?${query}`);
      
      if (response.success && response.data) {
        set({ products: response.data.products, isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
})); 