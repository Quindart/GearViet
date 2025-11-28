"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import Breadcrumb, { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { FaShoppingBag } from "react-icons/fa";
import { getOrdersByUserId } from "@/services/orderApi";
import { useAuthStore } from "@/store";
import { Order } from "@/types/order";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorMessage from "@/components/shared/ErrorMessage";
import OrderList from "./components/OrderList";
import OrderFilters from "./components/OrderFilters";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

function OrdersPageContent() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { user, isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated || !user) {
        setError("Vui lòng đăng nhập để xem đơn hàng");
        setLoading(false);
        return;
      }

      const userId = (user as { id?: string; _id?: string }).id || (user as { id?: string; _id?: string })._id;
      
      if (!userId) {
        setError("Không thể xác định người dùng");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const ordersData = await getOrdersByUserId(userId);
        setOrders(ordersData);
        setFilteredOrders(ordersData);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Có lỗi xảy ra khi tải danh sách đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, isAuthenticated]);

  useEffect(() => {
    let filtered = [...orders];

    if (filters.status !== "all") {
      filtered = filtered.filter((order) => order.status === filters.status);
    }

    if (filters.search.trim()) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.code.toLowerCase().includes(searchLower) ||
          order._id.toLowerCase().includes(searchLower)
      );
    }

    setFilteredOrders(filtered);
  }, [orders, filters]);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Trang chủ", href: "/" },
    { label: "Đơn hàng của tôi", icon: <FaShoppingBag className="w-4 h-4" /> },
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
            onRetry={() => router.push("/")}
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
          <h1 className="text-3xl font-bold text-gray-900">Đơn hàng của tôi</h1>
          <p className="text-gray-600 mt-2">
            Theo dõi và quản lý đơn hàng của bạn
          </p>
        </div>

        <OrderFilters filters={filters} onFiltersChange={setFilters} />

        <div className="mt-6">
          <OrderList orders={filteredOrders} />
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <OrdersPageContent />
    </ProtectedRoute>
  );
}

