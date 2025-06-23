import Link from "next/link";
import { FaHome, FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Sản phẩm không tồn tại
          </h2>
          <p className="text-gray-600 mb-8">
            Rất tiếc, chúng tôi không thể tìm thấy sản phẩm bạn đang tìm kiếm.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            <FaHome className="w-4 h-4" />
            Về trang chủ
          </Link>

          <div className="text-center">
            <span className="text-gray-400 mx-4">hoặc</span>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 border border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            <FaSearch className="w-4 h-4" />
            Tìm sản phẩm khác
          </Link>
        </div>
      </div>
    </div>
  );
}
