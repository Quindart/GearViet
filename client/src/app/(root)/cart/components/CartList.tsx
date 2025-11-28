"use client";

import { FaShoppingCart } from "react-icons/fa";
import CartItemComponent from "./CartItem";
import EmptyCart from "./EmptyCart";
import { CartItem } from "@/store/useCartStore";

interface CartListProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export default function CartList({ 
  items: cartItems, 
  onUpdateQuantity, 
  onRemoveItem 
}: CartListProps) {
  const updateQuantity = (productId: string, newQuantity: number) => {
    onUpdateQuantity(productId, newQuantity);
  };

  const removeItem = (productId: string) => {
    onRemoveItem(productId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <FaShoppingCart className="text-green-600" />
          Giỏ hàng ({cartItems.length} sản phẩm)
        </h2>
      </div>

      <div className="p-6">
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItemComponent
                key={item.product._id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
