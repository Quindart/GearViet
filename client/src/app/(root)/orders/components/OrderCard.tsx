"use client";

import Image from "next/image";
import { Order } from "@/types/order";
import { formatVNDPrice } from "@/utils/product";

interface OrderCardProps {
  order: Order;
}

const getStatusColor = (status: string) => {
  const statusLower = status.toLowerCase();
  if (statusLower.includes("pending") || statusLower.includes("chờ")) {
    return "bg-yellow-100 text-yellow-800";
  }
  if (statusLower.includes("processing") || statusLower.includes("đang xử lý")) {
    return "bg-blue-100 text-blue-800";
  }
  if (statusLower.includes("completed") || statusLower.includes("hoàn thành")) {
    return "bg-green-100 text-green-800";
  }
  if (statusLower.includes("cancelled") || statusLower.includes("hủy")) {
    return "bg-red-100 text-red-800";
  }
  return "bg-gray-100 text-gray-800";
};

const getStatusLabel = (status: string) => {
  const statusLower = status.toLowerCase();
  if (statusLower.includes("pending") || statusLower.includes("chờ")) {
    return "Chờ xử lý";
  }
  if (statusLower.includes("processing") || statusLower.includes("đang xử lý")) {
    return "Đang xử lý";
  }
  if (statusLower.includes("completed") || statusLower.includes("hoàn thành")) {
    return "Hoàn thành";
  }
  if (statusLower.includes("cancelled") || statusLower.includes("hủy")) {
    return "Đã hủy";
  }
  return status;
};

export default function OrderCard({ order }: OrderCardProps) {
  const totalAmount = order.products.reduce(
    (sum, item) => sum + item.currentPrice * item.quantity,
    0
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Order Info */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            <div>
              <p className="text-sm text-gray-600">Mã đơn hàng</p>
              <p className="font-semibold text-gray-900">{order.code}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {getStatusLabel(order.status)}
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-2">
            Ngày đặt: {formatDate(order.createdAt)}
          </p>

          {/* Order Items Preview */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex -space-x-2">
              {order.products.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-100"
                >
                  {item.product.images && item.product.images[0] && (
                    <Image
                      src={item.product.images[0].url || "/images/placeholder-product.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              {order.products.length} sản phẩm
              {order.products.length > 3 && " +"}
            </p>
          </div>
        </div>

        {/* Total Amount */}
        <div className="text-right">
          <p className="text-sm text-gray-600 mb-1">Tổng tiền</p>
          <p className="text-xl font-bold text-red-600">
            {formatVNDPrice(totalAmount)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {order.paymentType === "cash" ? "Thanh toán khi nhận hàng" : "Thanh toán online"}
          </p>
        </div>
      </div>
    </div>
  );
}

