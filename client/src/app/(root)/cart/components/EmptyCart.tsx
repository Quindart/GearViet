import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

export default function EmptyCart() {
  return (
    <div className="text-center py-12">
      <FaShoppingCart className="mx-auto text-gray-300 text-6xl mb-4" />
      <p className="text-gray-500 text-lg mb-4">
        Giỏ hàng của bạn đang trống
      </p>
      <p className="text-gray-400 mb-6">
        Mời bạn mua thêm sản phẩm{" "}
        <Link 
          href="/products" 
          className="text-green-600 hover:underline"
        >
          tại đây
        </Link>
      </p>
    </div>
  );
}
