"use client";

import Image from "next/image";
import { FaTrash } from "react-icons/fa";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  inStock: boolean;
}

interface CartItemComponentProps {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const formatPrice = (price: number) => {
  return price.toLocaleString("vi-VN") + "đ";
};

export default function CartItemComponent({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}: CartItemComponentProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemove(item.id);
      return;
    }
    onUpdateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
      {/* Product Image */}
      <div className="flex-shrink-0 w-20 h-20 relative">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded-lg"
          sizes="80px"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
          {item.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-red-600">
            {formatPrice(item.price)}
          </span>
          {item.originalPrice && item.originalPrice > item.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(item.originalPrice)}
            </span>
          )}
        </div>
        <p className="text-sm text-green-600 mt-1">
          {item.inStock ? "Còn hàng" : "Hết hàng"}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600"
          disabled={!item.inStock}
        >
          -
        </button>
        <span className="w-12 text-center font-medium">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600"
          disabled={!item.inStock}
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-700 p-2"
        title="Xóa sản phẩm"
      >
        <FaTrash className="w-4 h-4" />
      </button>
    </div>
  );
}
