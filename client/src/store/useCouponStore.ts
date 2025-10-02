import { create } from 'zustand';
import { api } from '@/lib/api';

export interface Coupon {
  _id: string;
  code: string;
  discount: number;
  maxUses: number;
  uses: number;
  validFrom: string;
  validTo: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

interface CouponState {
  coupons: Coupon[];
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCoupons: (page: number, limit: number) => Promise<void>;
  searchCoupons: (code: string, page: number, limit: number) => Promise<void>;
  updateCouponStatus: (couponId: string, status: 'active' | 'inactive') => Promise<void>;
}

export const useCouponStore = create<CouponState>((set, get) => ({
  coupons: [],
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  error: null,

  fetchCoupons: async (page: number, limit: number) => {
    try {
      set({ isLoading: true });
      const response = await api.get<{ coupons: Coupon[]; totalPages: number }>(
        `/coupons?page=${page}&limit=${limit}`
      );
      if (response.success && response.data) {
        set({
          coupons: response.data.coupons,
          totalPages: response.data.totalPages,
          currentPage: page,
          error: null,
        });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  searchCoupons: async (code: string, page: number, limit: number) => {
    try {
      set({ isLoading: true });
      const response = await api.get<{ coupons: Coupon[]; totalPages: number }>(
        `/coupons/search?code=${code}&page=${page}&limit=${limit}`
      );
      if (response.success && response.data) {
        set({
          coupons: response.data.coupons,
          totalPages: response.data.totalPages,
          currentPage: page,
          error: null,
        });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  updateCouponStatus: async (couponId: string, status: 'active' | 'inactive') => {
    try {
      set({ isLoading: true });
      const response = await api.put<{ coupon: Coupon }>(
        `/coupons/${couponId}/status`,
        { status }
      );
      if (response.success && response.data?.coupon) {
        const coupons = get().coupons.map(coupon =>
          coupon._id === couponId ? response.data!.coupon : coupon
        );
        set({ coupons, error: null });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
})); 