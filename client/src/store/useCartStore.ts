import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      subtotal: 0,

      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.product._id === product._id);

        if (existingItem) {
          const updatedItems = items.map(item =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({ items: updatedItems });
        } else {
          set({ items: [...items, { product, quantity }] });
        }

        get().calculateTotals();
      },

      removeItem: (productId) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.product._id !== productId);
        set({ items: updatedItems });
        get().calculateTotals();
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId);
          return;
        }

        const { items } = get();
        const updatedItems = items.map(item =>
          item.product._id === productId
            ? { ...item, quantity }
            : item
        );
        set({ items: updatedItems });
        get().calculateTotals();
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          subtotal: 0,
        });
      },

      getItemQuantity: (productId) => {
        const { items } = get();
        const item = items.find(item => item.product._id === productId);
        return item ? item.quantity : 0;
      },

      calculateTotals: () => {
        const { items } = get();
        const totalItems = items.reduce((total, item) => total + item.quantity, 0);
        const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

        set({
          totalItems,
          subtotal,
        });
      },
    }),
    {
      name: 'shopping-cart',
    }
  )
);

