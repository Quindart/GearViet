"use client";

import Image from "next/image";
import Link from "next/link";
import { Order } from "@/types/order";
import { formatVNDPrice } from "@/utils/product";

interface OrderItemsProps {
  order: Order;
}

export default function OrderItems({ order }: OrderItemsProps) {
  const totalAmount = order.products.reduce(
    (sum, item) => sum + item.currentPrice * item.quantity,
    0
  );

  const discountAmount = order.coupon
    ? Math.round((totalAmount * order.coupon.discount) / 100)
    : 0;

  const finalAmount = totalAmount - discountAmount;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Sản phẩm đã đặt</h2>

      <div className="space-y-4 mb-6">
        {order.products.map((item) => (
          <div
            key={item._id}
            className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors"
          >
            <Link
              href={`/products/${item.product._id}`}
              className="flex-shrink-0 w-20 h-20 relative"
            >
              <Image
                src={
                  item.product.images && item.product.images[0]
                    ? item.product.images[0].url
                    : item.product.image
                    ? item.product.image.url
                    : "/images/placeholder-product.svg"
                }
                alt={item.product.name}
                fill
                className="object-cover rounded-lg"
                sizes="80px"
              />
            </Link>

            <div className="flex-1">
              <Link
                href={`/products/${item.product._id}`}
                className="font-medium text-gray-900 hover:text-green-600 transition-colors"
              >
                {item.product.name}
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                Số lượng: {item.quantity}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Giá: {formatVNDPrice(item.currentPrice)}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-gray-900">
                {formatVNDPrice(item.currentPrice * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tạm tính:</span>
          <span className="font-medium">{formatVNDPrice(totalAmount)}</span>
        </div>
        {order.coupon && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Giảm giá ({order.coupon.code}): -{order.coupon.discount}%
            </span>
            <span className="font-medium text-green-600">
              -{formatVNDPrice(discountAmount)}
            </span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Phí vận chuyển:</span>
          <span className="font-medium text-green-600">Miễn phí</span>
        </div>
        <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
          <span>Tổng tiền:</span>
          <span className="text-red-600">{formatVNDPrice(finalAmount)}</span>
        </div>
      </div>
    </div>
  );
}

