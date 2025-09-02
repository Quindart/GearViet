import { create } from 'zustand';
import { api } from '@/lib/api';

export interface ReviewStats {
  rating: number;
  count: number;
  percentage: number;
}

export interface Review {
  _id: string;
  user: {
    _id: string;
    username: string;
    avatar?: string;
  };
  product: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

interface ReviewState {
  reviews: Review[];
  stats: ReviewStats[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchReviews: (productId: string) => Promise<void>;
  createReview: (productId: string, data: { rating: number; comment: string; images?: string[] }) => Promise<void>;
  updateReview: (reviewId: string, data: { rating: number; comment: string; images?: string[] }) => Promise<void>;
  deleteReview: (reviewId: string) => Promise<void>;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: [],
  stats: [],
  isLoading: false,
  error: null,

  fetchReviews: async (productId: string) => {
    try {
      set({ isLoading: true });
      const response = await api.get<{ reviews: Review[]; stats: ReviewStats[] }>(
        `/reviews/product/${productId}`
      );
      if (response.success && response.data) {
        set({
          reviews: response.data.reviews,
          stats: response.data.stats,
          error: null,
        });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  createReview: async (productId: string, data) => {
    try {
      set({ isLoading: true });
      const response = await api.post<{ review: Review }>(
        `/reviews/product/${productId}`,
        data
      );
      if (response.success && response.data?.review) {
        const reviews = [...get().reviews, response.data.review];
        set({ reviews, error: null });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateReview: async (reviewId: string, data) => {
    try {
      set({ isLoading: true });
      const response = await api.put<{ review: Review }>(
        `/reviews/${reviewId}`,
        data
      );
      if (response.success && response.data?.review) {
        const reviews = get().reviews.map(review =>
          review._id === reviewId ? response.data!.review : review
        );
        set({ reviews, error: null });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteReview: async (reviewId: string) => {
    try {
      set({ isLoading: true });
      const response = await api.delete<{ success: boolean }>(
        `/reviews/${reviewId}`
      );
      if (response.success) {
        const reviews = get().reviews.filter(review => review._id !== reviewId);
        set({ reviews, error: null });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
})); 