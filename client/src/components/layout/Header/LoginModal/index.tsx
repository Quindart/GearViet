import {
  loginUser
} from "@/services";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  triggerRef,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await loginUser({
        email,
        password,
        remember,
      });

      if (response.success && response.data) {
        // Save auth data to Zustand store
        setAuth(response.data.token, response.data.user);

        // Show success notification
        enqueueSnackbar("Đăng nhập thành công!", {
          variant: "success",
          autoHideDuration: 2000,
        });

        // Clear form and close modal
        setEmail("");
        setPassword("");
        setRemember(false);
        onClose();

        // Redirect to homepage after a short delay
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        setError(response.message || "Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const triggerElement = triggerRef.current;
  let modalStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 9999,
    width: "360px",
    top: 100,
    left: 50,
  };

  if (triggerElement) {
    const rect = triggerElement.getBoundingClientRect();
    const modalWidth = 360;
    const viewportWidth = window.innerWidth;

    // Calculate left position, ensuring modal stays within viewport
    let leftPosition = rect.left - 200;
    if (leftPosition < 10) {
      leftPosition = 10; // Minimum margin from left edge
    } else if (leftPosition + modalWidth > viewportWidth - 10) {
      leftPosition = viewportWidth - modalWidth - 10; // Keep 10px margin from right edge
    }

    modalStyle = {
      position: "fixed",
      zIndex: 9999,
      width: "360px",
      top: rect.bottom + 10, // Position below the button with 10px gap
      left: leftPosition,
    };
  }

  return (
    <>
      {/* Black Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-30 z-[9998]"
        onClick={onClose}
      />

      {/* Modal Dropdown */}
      <div
        className="bg-white rounded-lg shadow-lg border animate-in fade-in-0 zoom-in-95 duration-200"
        style={modalStyle}
      >
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              ĐĂNG NHẬP TÀI KHOẢN
            </h2>
            <p className="text-sm text-gray-600">
              Nhập email và mật khẩu của bạn:
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={isSubmitting}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-green-600 hover:text-green-500"
                  onClick={onClose}
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors duration-200 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isSubmitting ? "Đang xử lý..." : "ĐĂNG NHẬP"}
            </button>
          </form>

          {/* Registration Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                href="/register"
                className="font-medium text-green-600 hover:text-green-500"
                onClick={onClose}
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
