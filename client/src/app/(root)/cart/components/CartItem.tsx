"use client";

import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { CartItem } from "@/store/useCartStore";
import Link from "next/link";

interface CartItemComponentProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const formatPrice = (price: number) => {
  return price.toLocaleString("vi-VN") + "đ";
};

export default function CartItemComponent({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}: CartItemComponentProps) {
  const { product, quantity } = item;
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemove(product._id);
      return;
    }
    onUpdateQuantity(product._id, newQuantity);
  };

  const getImageUrl = () => {
    return product.images?.[0]?.url || product.image?.url || "/images/placeholder-product.svg";
  };

  return (
    <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
      {/* Product Image */}
      <Link href={`/products/${product._id}`} className="flex-shrink-0 w-20 h-20 relative">
        <Image
          src={getImageUrl()}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
          sizes="80px"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 hover:text-green-600">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-red-600">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className={`text-sm mt-1 ${product.available > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {product.available > 0 ? "Còn hàng" : "Hết hàng"}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600"
          disabled={product.available === 0}
        >
          -
        </button>
        <span className="w-12 text-center font-medium">
          {quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600"
          disabled={product.available === 0}
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(product._id)}
        className="text-red-500 hover:text-red-700 p-2"
        title="Xóa sản phẩm"
      >
        <FaTrash className="w-4 h-4" />
      </button>
    </div>
  );
}
