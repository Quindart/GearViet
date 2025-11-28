"use client";

import { useRouter } from "next/navigation";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import { useCartStore } from "@/store";

export default function CartManager() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleCheckout = () => {
    if (items.length === 0) return;
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
          items={items}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
        />
      </div>

      {/* Right Column - Order Summary */}
      <div className="col-span-12 lg:col-span-4">
        <CartSummary
          items={items}
          onCheckout={handleCheckout}
          onContinueShopping={handleContinueShopping}
        />
      </div>
    </div>
  );
}
