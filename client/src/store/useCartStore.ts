import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './useProductStore';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  shippingPrice: number;
  taxPrice: number;
  
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,

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
        if (quantity < 1) return;

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
          totalPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
        });
      },

      calculateTotals: () => {
        const { items } = get();
        const totalItems = items.reduce((total, item) => total + item.quantity, 0);
        const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        
        // Calculate shipping price (example logic)
        const shippingPrice = subtotal > 100 ? 0 : 10;
        
        // Calculate tax (example: 10%)
        const taxPrice = subtotal * 0.1;
        
        const totalPrice = subtotal + shippingPrice + taxPrice;

        set({
          totalItems,
          totalPrice,
          shippingPrice,
          taxPrice,
        });
      },
    }),
    {
      name: 'shopping-cart',
      skipHydration: true,
    }
  )
); 