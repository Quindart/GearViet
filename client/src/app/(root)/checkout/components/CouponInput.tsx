"use client";

import { useState } from "react";
import { FaTag } from "react-icons/fa";
import { useSnackbar } from "notistack";
import { validateCouponCode } from "@/services/couponApi";

interface CouponInputProps {
  onCouponValidated: (code: string, discount: number) => void;
}

export default function CouponInput({ onCouponValidated }: CouponInputProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleValidate = async () => {
    if (!code.trim()) {
      enqueueSnackbar("Vui lòng nhập mã coupon", { variant: "warning" });
      return;
    }

    setLoading(true);

    try {
      const result = await validateCouponCode(code);

      if (result.valid && result.discount) {
        onCouponValidated(code, result.discount);
        enqueueSnackbar(
          `Mã coupon hợp lệ! Giảm ${result.discount}%`,
          { variant: "success" }
        );
      } else {
        enqueueSnackbar(
          result.message || "Mã coupon không hợp lệ",
          { variant: "error" }
        );
      }
    } catch (error) {
      enqueueSnackbar(
        "Có lỗi xảy ra khi kiểm tra mã coupon",
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
        <FaTag className="text-gray-400" />
        Mã giảm giá (tùy chọn)
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Nhập mã giảm giá"
          onKeyPress={(e) => e.key === "Enter" && handleValidate()}
        />
        <button
          type="button"
          onClick={handleValidate}
          disabled={loading}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          {loading ? "Đang kiểm tra..." : "Áp dụng"}
        </button>
      </div>
    </div>
  );
}

