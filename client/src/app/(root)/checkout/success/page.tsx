"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { FaCheckCircle, FaHome, FaShoppingBag, FaExclamationCircle } from "react-icons/fa";
import Breadcrumb, { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { getOrderById } from "@/services/orderApi";
import { handlePaymentSuccess } from "@/services/paymentApi";
import { Order } from "@/types/order";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorMessage from "@/components/shared/ErrorMessage";
import EmptyState from "@/components/shared/EmptyState";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentVerified, setPaymentVerified] = useState<boolean | null>(null);
  const orderId = searchParams.get("orderId");
  const vnp_TxnRef = searchParams.get("vnp_TxnRef");
  const vnp_Amount = searchParams.get("vnp_Amount");
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");

  useEffect(() => {
    const verifyPaymentAndFetchOrder = async () => {
      try {
        setLoading(true);

        // If payment params exist, verify payment first
        if (vnp_TxnRef && vnp_Amount && vnp_ResponseCode) {
          const paymentResult = await handlePaymentSuccess({
            vnp_TxnRef,
            vnp_Amount,
            vnp_ResponseCode,
          });

          if (paymentResult && paymentResult.success) {
            setPaymentVerified(true);
            enqueueSnackbar("Thanh toán thành công!", { variant: "success" });

            // Fetch order using orderId from payment result
            if (paymentResult.orderId) {
              const orderData = await getOrderById(paymentResult.orderId);
              if (orderData) {
                setOrder(orderData);
              } else {
                setError("Không thể tải thông tin đơn hàng");
              }
            } else {
              setError("Không tìm thấy mã đơn hàng");
            }
          } else {
            setPaymentVerified(false);
            enqueueSnackbar(
              paymentResult?.message || "Thanh toán thất bại. Vui lòng thử lại.",
              { variant: "error" }
            );
            setError("Thanh toán không thành công");
          }
        } else if (orderId) {
          // No payment params, just fetch order by orderId
          const orderData = await getOrderById(orderId);
          if (orderData) {
            setOrder(orderData);
          } else {
            setError("Không thể tải thông tin đơn hàng");
          }
        } else {
          setError("Không tìm thấy đơn hàng");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Có lỗi xảy ra khi tải thông tin đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    verifyPaymentAndFetchOrder();
  }, [orderId, vnp_TxnRef, vnp_Amount, vnp_ResponseCode, enqueueSnackbar]);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Trang chủ", href: "/" },
    { label: "Đặt hàng thành công" },
  ];

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

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
            message="Đơn hàng của bạn không tồn tại"
            actionLabel="Quay về trang chủ"
            onAction={() => router.push("/")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Success Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            {paymentVerified === false ? (
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                <FaExclamationCircle className="text-red-600 text-5xl" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <FaCheckCircle className="text-green-600 text-5xl" />
              </div>
            )}
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {paymentVerified === false
                ? "Thanh toán thất bại"
                : "Đặt hàng thành công!"}
            </h1>
            <p className="text-gray-600">
              {paymentVerified === false
                ? "Vui lòng thử lại hoặc liên hệ hỗ trợ"
                : "Cảm ơn bạn đã đặt hàng tại GearViet"}
            </p>
          </div>

          {/* Order Info */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Mã đơn hàng:</span>
              <span className="font-semibold text-gray-900">{order.code}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Trạng thái:</span>
              <span className="font-semibold text-green-600 capitalize">
                {order.status}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Phương thức thanh toán:</span>
              <span className="font-semibold text-gray-900 capitalize">
                {order.paymentType === "cash" ? "Thanh toán khi nhận hàng" : "Thanh toán online"}
              </span>
            </div>

            {order.paymentStatus && (
              <div className="flex justify-between">
                <span className="text-gray-600">Trạng thái thanh toán:</span>
                <span className="font-semibold text-gray-900 capitalize">
                  {order.paymentStatus}
                </span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 pt-6 mt-6 flex gap-4">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <FaHome />
              Trang chủ
            </Link>
            
            <Link
              href={`/orders/${order._id}`}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <FaShoppingBag />
              Xem đơn hàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

