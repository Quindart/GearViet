"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import Link from "next/link";
import { FaUndo, FaShoppingCart, FaMapMarkerAlt } from "react-icons/fa";
import { Order } from "@/types/order";
import { useCartStore } from "@/store";

interface OrderActionsProps {
  order: Order;
  onOrderUpdate: (order: Order) => void;
}

export default function OrderActions({ order, onOrderUpdate }: OrderActionsProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const addItem = useCartStore((state) => state.addItem);
  const [loading, setLoading] = useState(false);

  const canCancel = () => {
    const statusLower = order.status.toLowerCase();
    return (
      statusLower.includes("pending") || statusLower.includes("chờ")
    );
  };

  const handleCancel = async () => {
    if (!confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) {
      return;
    }

    setLoading(true);
    try {
      enqueueSnackbar("Tính năng hủy đơn hàng đang được phát triển", {
        variant: "info",
      });
    } catch (error) {
      console.error("Cancel order error:", error);
      enqueueSnackbar("Không thể hủy đơn hàng", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = () => {
    try {
      order.products.forEach((item) => {
        if (item.product.available > 0) {
          addItem(item.product, item.quantity);
        }
      });

      enqueueSnackbar("Đã thêm sản phẩm vào giỏ hàng", { variant: "success" });
      router.push("/cart");
    } catch (error) {
      console.error("Reorder error:", error);
      enqueueSnackbar("Có lỗi xảy ra khi đặt lại đơn hàng", { variant: "error" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Shipping Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaMapMarkerAlt className="text-green-600" />
          Thông tin giao hàng
        </h2>

        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-600">Người nhận:</p>
            <p className="font-medium text-gray-900">{order.customerInfo.fullname}</p>
          </div>
          <div>
            <p className="text-gray-600">Số điện thoại:</p>
            <p className="font-medium text-gray-900">{order.customerInfo.phone}</p>
          </div>
          {order.customerInfo.email && (
            <div>
              <p className="text-gray-600">Email:</p>
              <p className="font-medium text-gray-900">{order.customerInfo.email}</p>
            </div>
          )}
          <div>
            <p className="text-gray-600">Địa chỉ:</p>
            <p className="font-medium text-gray-900">{order.customerInfo.address}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Thao tác</h2>

        <div className="space-y-3">
          {canCancel() && (
            <button
              onClick={handleCancel}
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              <FaUndo />
              Hủy đơn hàng
            </button>
          )}

          <button
            onClick={handleReorder}
            className="w-full py-3 px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <FaShoppingCart />
            Đặt lại đơn hàng
          </button>

          <Link
            href="/orders"
            className="block w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
          >
            Quay về danh sách đơn hàng
          </Link>
        </div>
      </div>
    </div>
  );
}

