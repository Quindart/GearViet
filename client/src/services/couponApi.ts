import { api } from "@/lib/api";
import { ValidateCouponResponse } from "@/types/coupon";
import { ApiResponse } from "@/types/api-response";

interface CouponValidationResult {
  valid: boolean;
  discount?: number;
  message?: string;
}

/**
 * Validate coupon code
 */
export const validateCouponCode = async (
  code: string
): Promise<ValidateCouponResponse> => {
  try {
    const result = await api.get<ApiResponse & { discount?: number }>(
      `/coupon/check-udc?code=${encodeURIComponent(code)}`
    );
    
    return {
      valid: result.success || false,
      discount: result.discount,
      message: result.message || "Invalid coupon code",
    };
  } catch (error) {
    console.error("Validate coupon code error:", error);
    return {
      valid: false,
      message: error instanceof Error ? error.message : "Failed to validate coupon code",
    };
  }
};

