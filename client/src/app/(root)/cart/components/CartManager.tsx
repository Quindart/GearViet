"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import type { CartItem } from "./CartItem";

interface CartManagerProps {
  initialItems: CartItem[];
}

export default function CartManager({ initialItems }: CartManagerProps) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);

  const updateCartQuantity = (id: number, newQuantity: number) => {
    setCartItems(prev =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeCartItem = (id: number) => {
    setCartItems(prev => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    // TODO: Implement checkout logic
    console.log("Proceeding to checkout with items:", cartItems);
    router.push("/checkout");
  };

  const handleContinueShopping = () => {
    router.push("/products");
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left Column - Cart Items */}
      <div className="col-span-12 lg:col-span-8">
        <CartList 
          initialItems={cartItems}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeCartItem}
        />
      </div>

      {/* Right Column - Order Summary */}
      <div className="col-span-12 lg:col-span-4">
        <CartSummary
          items={cartItems}
          onCheckout={handleCheckout}
          onContinueShopping={handleContinueShopping}
        />
      </div>
    </div>
  );
}
