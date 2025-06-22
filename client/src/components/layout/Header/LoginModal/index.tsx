import Link from "next/link";
import React, { useState } from "react";

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
          <form className="space-y-4">
            {/* Email Field */}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Đăng nhập
            </button>
          </form>

          {/* Links */}
          <div className="mt-4 space-y-2 text-center">
            <div className="text-sm">
              <span className="text-gray-600">Khách hàng mới? </span>
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={onClose}
              >
                Tạo tài khoản
              </Link>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Quên mật khẩu? </span>
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={onClose}
              >
                Khôi phục mật khẩu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
