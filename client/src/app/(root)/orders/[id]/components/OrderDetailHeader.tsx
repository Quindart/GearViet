"use client";

import { Order } from "@/types/order";
import { formatVNDPrice } from "@/utils/product";

interface OrderDetailHeaderProps {
  order: Order;
}

const getStatusColor = (status: string) => {
  const statusLower = status.toLowerCase();
  if (statusLower.includes("pending") || statusLower.includes("chờ")) {
    return "bg-yellow-100 text-yellow-800 border-yellow-300";
  }
  if (statusLower.includes("processing") || statusLower.includes("đang xử lý")) {
    return "bg-blue-100 text-blue-800 border-blue-300";
  }
  if (statusLower.includes("completed") || statusLower.includes("hoàn thành")) {
    return "bg-green-100 text-green-800 border-green-300";
  }
  if (statusLower.includes("cancelled") || statusLower.includes("hủy")) {
    return "bg-red-100 text-red-800 border-red-300";
  }
  return "bg-gray-100 text-gray-800 border-gray-300";
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

export default function OrderDetailHeader({ order }: OrderDetailHeaderProps) {
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            <div>
              <p className="text-sm text-gray-600">Mã đơn hàng</p>
              <p className="text-xl font-bold text-gray-900">{order.code}</p>
            </div>
            <div
              className={`px-4 py-2 rounded-lg border-2 font-semibold ${getStatusColor(order.status)}`}
            >
              {getStatusLabel(order.status)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Ngày đặt:</p>
              <p className="font-medium text-gray-900">{formatDate(order.createdAt)}</p>
            </div>
            {order.updatedAt && order.updatedAt !== order.createdAt && (
              <div>
                <p className="text-gray-600">Cập nhật lần cuối:</p>
                <p className="font-medium text-gray-900">{formatDate(order.updatedAt)}</p>
              </div>
            )}
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-600 mb-1">Tổng tiền</p>
          <p className="text-2xl font-bold text-red-600">{formatVNDPrice(totalAmount)}</p>
          <p className="text-sm text-gray-500 mt-1">
            {order.paymentType === "cash" ? "Thanh toán khi nhận hàng" : "Thanh toán online"}
          </p>
          {order.paymentStatus && (
            <p className="text-xs text-gray-500 mt-1">
              Trạng thái thanh toán: {order.paymentStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

