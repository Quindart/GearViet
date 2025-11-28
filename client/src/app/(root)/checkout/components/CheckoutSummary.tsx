"use client";

import Link from "next/link";
import Image from "next/image";
import { FaShoppingBag } from "react-icons/fa";
import { CartItem } from "@/store/useCartStore";

interface CheckoutSummaryProps {
  items: CartItem[];
}

export default function CheckoutSummary({ items }: CheckoutSummaryProps) {
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaShoppingBag className="text-green-600" />
        Đơn hàng ({items.length} sản phẩm)
      </h2>

      {/* Items List */}
      <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
        {items.map((item) => (
          <div key={item.product._id} className="flex gap-4">
            <Link href={`/products/${item.product._id}`}>
              <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={item.product.images?.[0]?.url || item.product.image?.url || "/images/placeholder-product.svg"}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={`/products/${item.product._id}`}>
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-green-600">
                  {item.product.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                Số lượng: {item.quantity}
              </p>
              <p className="text-sm font-semibold text-green-600 mt-1">
                {formatPrice(item.product.price)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between text-gray-700">
          <span>Tạm tính:</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Phí vận chuyển:</span>
          <span className="font-medium">Miễn phí</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="text-lg font-bold text-gray-900">Tổng cộng:</span>
            <span className="text-lg font-bold text-green-600">
              {formatPrice(subtotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

