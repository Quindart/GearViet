"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import Breadcrumb, { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { FaCreditCard, FaUndo } from "react-icons/fa";
import { CheckoutForm, CheckoutSummary } from "./components";
import { useCartStore } from "@/store";
import { createOrder } from "@/services/orderApi";
import { createPaymentUrl } from "@/services/paymentApi";
import { CreateOrderData, Order } from "@/types/order";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

function CheckoutPageContent() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Redirect to cart if empty
    if (items.length === 0) {
      enqueueSnackbar("Giỏ hàng trống", { variant: "warning" });
      router.push("/cart");
      return;
    }
  }, [items, router, enqueueSnackbar]);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Trang chủ", href: "/" },
    { label: "Giỏ hàng", href: "/cart" },
    { 
      label: "Thanh toán", 
      icon: <FaCreditCard className="w-4 h-4" /> 
    },
  ];

  if (!mounted) {
    return null;
  }

  if (items.length === 0) {
    return null; // Will redirect
  }

  const handleCheckout = async (customerInfo: {
    fullname: string;
    phone: string;
    email?: string;
    address: string;
  }, couponCode?: string, paymentType: string = "cash") => {
    setLoading(true);

    try {
      // Create order data
      const orderData: CreateOrderData = {
        products: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          currentPrice: item.product.price,
        })),
        customerInfo,
        paymentType,
        ...(couponCode && { coupon: couponCode }),
      };

      // Create order
      const order = await createOrder(orderData);

      if (!order) {
        enqueueSnackbar("Không thể tạo đơn hàng", { variant: "error" });
        setLoading(false);
        return;
      }

      // If payment type is not cash, create payment URL
      if (paymentType === "online") {
        const paymentUrl = await createPaymentUrl({
          orderId: order._id,
          amount: subtotal,
          returnUrl: `${window.location.origin}/checkout/success`,
        });

        if (paymentUrl && paymentUrl.vnpUrl) {
          window.location.href = paymentUrl.vnpUrl;
          return;
        } else {
          enqueueSnackbar("Không thể tạo URL thanh toán", { variant: "error" });
          setLoading(false);
          return;
        }
      }

      // If cash payment, show success and clear cart
      enqueueSnackbar("Đặt hàng thành công!", { variant: "success" });
      clearCart();
      router.push(`/checkout/success?orderId=${order._id}`);
    } catch (error) {
      console.error("Checkout error:", error);
      enqueueSnackbar(
        error instanceof Error ? error.message : "Có lỗi xảy ra khi đặt hàng",
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Thanh toán</h1>
          <p className="text-gray-600 mt-2">
            Vui lòng điền thông tin để hoàn tất đơn hàng
          </p>
        </div>

        {/* Checkout Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Checkout Form */}
          <div className="col-span-12 lg:col-span-8">
            <CheckoutForm onSubmit={handleCheckout} loading={loading} />
          </div>

          {/* Right Column - Order Summary */}
          <div className="col-span-12 lg:col-span-4">
            <CheckoutSummary items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutPageContent />
    </ProtectedRoute>
  );
}

