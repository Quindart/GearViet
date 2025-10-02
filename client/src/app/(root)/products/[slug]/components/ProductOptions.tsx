"use client";

import { useState } from "react";
import { logger } from "@/utils/logger";
import { Product } from "@/types/product-page";

interface ProductOptionsProps {
  product: Product;
}

export default function ProductOptions({ product }: ProductOptionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Đen");

  const handleAddToCart = () => {
    logger.info("Product added to cart", { 
      productId: product.id, 
      productName: product.name,
      quantity, 
      selectedColor 
    });
  };

  return (
    <div className="space-y-4">
      {/* Color Selection */}
      <div>
        <div className="text-sm font-medium text-gray-900 mb-2">
          Màu sắc:
        </div>
        <div className="flex gap-2">
          {["Đen"].map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 border rounded-lg text-sm transition-colors flex items-center gap-2 ${
                selectedColor === color
                  ? "border-red-500 bg-red-50 text-red-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="w-4 h-4 bg-black rounded border border-gray-300"></div>
              {color}
            </button>
          ))}
        </div>
      </div>

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
          disabled={!product.inStock}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
            product.inStock
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {product.inStock ? "THÊM VÀO GIỎ" : "HẾT HÀNG"}
          <div className="text-xs mt-1">
            Giao Tận Nơi Hoặc Nhận Tại Cửa Hàng
          </div>
        </button>
      </div>
    </div>
  );
}
