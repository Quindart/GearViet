"use client";

import { useState } from "react";
import { useSnackbar } from "notistack";
import { useCartStore } from "@/store";
import { Product } from "@/types/product";

interface ProductOptionsProps {
  product: Product;
}

export default function ProductOptions({ product }: ProductOptionsProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const { enqueueSnackbar } = useSnackbar();

  const handleAddToCart = () => {
    addItem(product, quantity);
    enqueueSnackbar(
      `Đã thêm ${quantity} ${product.name} vào giỏ hàng`,
      { 
        variant: 'success',
        autoHideDuration: 3000,
      }
    );
  };

  return (
    <div className="space-y-4">
      {/* Quantity */}
      <div>
        <div className="text-sm font-medium text-gray-900 mb-2">
          Số lượng:
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 hover:bg-gray-50 transition-colors text-lg"
            >
              −
            </button>
            <span className="px-4 py-2 min-w-[60px] text-center font-medium">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 hover:bg-gray-50 transition-colors text-lg"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={product.available === 0}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
            product.available > 0
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {product.available > 0 ? "THÊM VÀO GIỎ" : "HẾT HÀNG"}
        </button>
        <div className="text-xs text-center text-gray-500">
          Giao tận nơi hoặc nhận tại cửa hàng
        </div>
      </div>
    </div>
  );
}
