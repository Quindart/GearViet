"use client";

import { useState } from "react";
import { useSnackbar } from "notistack";
import { CartItem } from "@/store/useCartStore";
import { validateCouponCode } from "@/services/couponApi";
import { formatVNDPrice } from "@/utils/product";

interface CartSummaryProps {
  items: CartItem[];
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export default function CartSummary({ 
  items, 
  onCheckout, 
  onContinueShopping 
}: CartSummaryProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [validatedCoupon, setValidatedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const calculateDiscount = () => {
    if (!validatedCoupon) return 0;
    const subtotal = calculateSubtotal();
    return Math.round((subtotal * validatedCoupon.discount) / 100);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    return subtotal - discount;
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      enqueueSnackbar("Vui lòng nhập mã coupon", { variant: "warning" });
      return;
    }
    
    setIsApplyingPromo(true);

    try {
      const result = await validateCouponCode(promoCode);

      if (result.valid && result.discount) {
        setValidatedCoupon({ code: promoCode, discount: result.discount });
        enqueueSnackbar(
          `Mã coupon hợp lệ! Giảm ${result.discount}%`,
          { variant: "success" }
        );
      } else {
        setValidatedCoupon(null);
        enqueueSnackbar(
          result.message || "Mã coupon không hợp lệ",
          { variant: "error" }
        );
      }
    } catch (error) {
      console.error("Coupon validation error:", error);
      enqueueSnackbar(
        "Có lỗi xảy ra khi kiểm tra mã coupon",
        { variant: "error" }
      );
      setValidatedCoupon(null);
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleRemoveCoupon = () => {
    setValidatedCoupon(null);
    setPromoCode("");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm sticky top-6">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">
          Thông tin đơn hàng
        </h3>
      </div>

      <div className="p-6 space-y-4">
        {/* Promo Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mã khuyến mãi (nếu có)
          </label>
          {validatedCoupon ? (
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-800">
                  {validatedCoupon.code} - Giảm {validatedCoupon.discount}%
                </p>
                <p className="text-xs text-green-600">
                  Giảm {formatVNDPrice(calculateDiscount())}
                </p>
              </div>
              <button
                onClick={handleRemoveCoupon}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Xóa
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleApplyPromo()}
                placeholder="Nhập mã khuyến mãi"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button 
                onClick={handleApplyPromo}
                disabled={isApplyingPromo || !promoCode.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isApplyingPromo ? 'Đang áp dụng...' : 'Áp dụng'}
              </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="space-y-2 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tạm tính:</span>
            <span className="font-medium">
              {formatVNDPrice(calculateSubtotal())}
            </span>
          </div>
          {validatedCoupon && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Giảm giá ({validatedCoupon.code}):
              </span>
              <span className="font-medium text-green-600">
                -{formatVNDPrice(calculateDiscount())}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Phí vận chuyển:</span>
            <span className="font-medium text-green-600">Miễn phí</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
            <span>Tổng tiền:</span>
            <span className="text-red-600">
              {formatVNDPrice(calculateTotal())}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={onCheckout}
          disabled={items.length === 0}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
            items.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {items.length === 0 ? "Giỏ hàng trống" : "THANH TOÁN NGAY"}
        </button>

        {/* Continue Shopping */}
        <button 
          onClick={onContinueShopping}
          className="w-full py-3 px-4 border border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors"
        >
          TIẾP TỤC MUA HÀNG
        </button>

        {/* Notes */}
        <div className="text-xs text-gray-500 space-y-1 pt-4 border-t border-gray-200">
          <p>• Miễn phí giao hàng cho đơn hàng từ 500.000đ</p>
          <p>• Thanh toán khi nhận hàng (COD)</p>
          <p>• Bảo hành chính hãng</p>
        </div>
      </div>
    </div>
  );
}
