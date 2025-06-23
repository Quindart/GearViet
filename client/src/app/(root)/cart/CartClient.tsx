"use client";

import Image from "next/image";
import { useState } from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";

// Mock data for cart items
const mockCartItems = [
  {
    id: 1,
    name: "Bộ Vi Xử Lý - CPU AMD Ryzen 5 5600GT / 3.6GHz Boost 4.4GHz / 6 Nhân 12 Luồng / 16MB / AM4",
    price: 3890000,
    originalPrice: 4200000,
    quantity: 1,
    image: "https://placehold.co/180/png",
    inStock: true,
  },
  {
    id: 2,
    name: "Bộ máy tính TGG GOLD I | 12TH",
    price: 11790000,
    originalPrice: 12490000,
    quantity: 1,
    image: "https://placehold.co/180/png",
    inStock: true,
  },
];

// Mock data for recently viewed products
const mockRecentlyViewed = [
  {
    id: 3,
    name: "Bộ Vi Xử Lý - CPU AMD Ryzen 5 5500GT / 3.6GHz Boost 4.2GHz",
    price: 3750000,
    originalPrice: 4000000,
    image: "https://placehold.co/180/png",
  },
  {
    id: 4,
    name: "Card màn hình MSI GeForce RTX 4060",
    price: 8990000,
    originalPrice: 9500000,
    image: "https://placehold.co/180/png",
  },
  {
    id: 5,
    name: "RAM Corsair Vengeance LPX 16GB",
    price: 1290000,
    originalPrice: 1450000,
    image: "https://placehold.co/180/png",
  },
];

const CartClient = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal(); // Add shipping, taxes, discounts here if needed
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left Column - Cart Items */}
      <div className="col-span-12 lg:col-span-8">
        {/* Cart Panel */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FaShoppingCart className="text-green-600" />
              Giỏ hàng ({cartItems.length} sản phẩm)
            </h2>
          </div>

          <div className="p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <FaShoppingCart className="mx-auto text-gray-300 text-6xl mb-4" />
                <p className="text-gray-500 text-lg mb-4">
                  Giỏ hàng của bạn đang trống
                </p>
                <p className="text-gray-400 mb-6">
                  Mời bạn mua thêm sản phẩm{" "}
                  <span className="text-green-600 cursor-pointer hover:underline">
                    tại đây
                  </span>
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-20 h-20 relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                        sizes="80px"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-red-600">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice &&
                          item.originalPrice > item.price && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(item.originalPrice)}
                            </span>
                          )}
                      </div>
                      <p className="text-sm text-green-600 mt-1">
                        {item.inStock ? "Còn hàng" : "Hết hàng"}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                      title="Xóa sản phẩm"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recently Viewed Products */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Sản phẩm đã xem</h3>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockRecentlyViewed.map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors cursor-pointer"
                >
                  <div className="aspect-square mb-3 relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600 font-bold">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-500 text-sm line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Order Summary */}
      <div className="col-span-12 lg:col-span-4">
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
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Nhập mã khuyến mãi"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Áp dụng
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-2 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tạm tính:</span>
                <span className="font-medium">
                  {formatPrice(calculateSubtotal())}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Phí vận chuyển:</span>
                <span className="font-medium text-green-600">Miễn phí</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                <span>Tổng tiền:</span>
                <span className="text-red-600">
                  {formatPrice(calculateTotal())}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              disabled={cartItems.length === 0}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                cartItems.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {cartItems.length === 0 ? "Giỏ hàng trống" : "THANH TOÁN NGAY"}
            </button>

            {/* Continue Shopping */}
            <button className="w-full py-3 px-4 border border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors">
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
      </div>
    </div>
  );
};

export default CartClient;
