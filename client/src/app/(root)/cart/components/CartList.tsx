"use client";

import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartItemComponent, { type CartItem } from "./CartItem";
import EmptyCart from "./EmptyCart";

interface CartListProps {
  initialItems: CartItem[];
  onUpdateQuantity?: (id: number, quantity: number) => void;
  onRemoveItem?: (id: number) => void;
}

export default function CartList({ 
  initialItems, 
  onUpdateQuantity, 
  onRemoveItem 
}: CartListProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);

  // Sync with parent state
  useEffect(() => {
    setCartItems(initialItems);
  }, [initialItems]);

  const updateQuantity = (id: number, newQuantity: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    onUpdateQuantity?.(id, newQuantity);
  };

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    onRemoveItem?.(id);
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
                key={item.id}
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
