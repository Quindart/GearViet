"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import Breadcrumb, { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { FaShoppingBag } from "react-icons/fa";
import { getOrderById } from "@/services/orderApi";
import { Order } from "@/types/order";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorMessage from "@/components/shared/ErrorMessage";
import EmptyState from "@/components/shared/EmptyState";
import OrderDetailHeader from "./components/OrderDetailHeader";
import OrderItems from "./components/OrderItems";
import OrderTimeline from "./components/OrderTimeline";
import OrderActions from "./components/OrderActions";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

function OrderDetailPageContent() {
  const params = useParams();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const orderId = params.id as string;

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError("Không tìm thấy đơn hàng");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const orderData = await getOrderById(orderId);
        if (orderData) {
          setOrder(orderData);
        } else {
          setError("Không thể tải thông tin đơn hàng");
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Có lỗi xảy ra khi tải thông tin đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Trang chủ", href: "/" },
    { label: "Đơn hàng", href: "/orders" },
    { label: order ? order.code : "Chi tiết đơn hàng", icon: <FaShoppingBag className="w-4 h-4" /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb items={breadcrumbItems} />
          <ErrorMessage
            title="Lỗi"
            message={error}
            onRetry={() => router.push("/orders")}
          />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb items={breadcrumbItems} />
          <EmptyState
            title="Không tìm thấy đơn hàng"
            message="Đơn hàng bạn tìm kiếm không tồn tại"
            actionLabel="Quay về danh sách đơn hàng"
            onAction={() => router.push("/orders")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Chi tiết đơn hàng</h1>
        </div>

        <div className="space-y-6">
          <OrderDetailHeader order={order} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <OrderItems order={order} />
              <OrderTimeline order={order} />
            </div>

            <div className="space-y-6">
              <OrderActions order={order} onOrderUpdate={setOrder} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderDetailPage() {
  return (
    <ProtectedRoute>
      <OrderDetailPageContent />
    </ProtectedRoute>
  );
}

