import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ShippingAddress } from './useOrderStore';

interface ShippingState {
  shippingAddress: ShippingAddress | null;
  shippingMethod: 'standard' | 'express' | null;
  shippingPrice: number;
  
  setShippingAddress: (address: ShippingAddress) => void;
  setShippingMethod: (method: 'standard' | 'express') => void;
  calculateShippingPrice: (subtotal: number) => void;
  clearShippingInfo: () => void;
}

export const useShippingStore = create<ShippingState>()(
  persist(
    (set) => ({
      shippingAddress: null,
      shippingMethod: null,
      shippingPrice: 0,

      setShippingAddress: (address) => {
        set({ shippingAddress: address });
      },

      setShippingMethod: (method) => {
        set({ shippingMethod: method });
        set((state) => {
          if (state.shippingMethod === 'express') {
            return { shippingPrice: 15 };
          }
          return { shippingPrice: 10 };
        });
      },

      calculateShippingPrice: (subtotal) => {
        set((state) => {
          // Free shipping for orders over $100
          if (subtotal >= 100) {
            return { shippingPrice: 0 };
          }

          // Express shipping costs more
          if (state.shippingMethod === 'express') {
            return { shippingPrice: 15 };
          }

          // Standard shipping
          return { shippingPrice: 10 };
        });
      },

      clearShippingInfo: () => {
        set({
          shippingAddress: null,
          shippingMethod: null,
          shippingPrice: 0,
        });
      },
    }),
    {
      name: 'shipping-info',
      skipHydration: true,
    }
  )
); 