"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FaCheck,
  FaHeart,
  FaPhone,
  FaRegHeart,
  FaRegStar,
  FaShare,
  FaShieldAlt,
  FaShoppingCart,
  FaStar,
  FaTruck,
  FaUndo,
} from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  warranty: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  tags: string[];
}

interface ProductClientProps {
  product: Product;
}

const ProductClient: React.FC<ProductClientProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState("Đen");
  const [activeTab, setActiveTab] = useState("description");

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FaStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <FaStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        );
      } else {
        stars.push(<FaRegStar key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  const handleAddToCart = () => {
    // Add to cart logic
    console.log("Added to cart:", { product, quantity, selectedColor });
  };

  const handleBuyNow = () => {
    // Buy now logic
    console.log("Buy now:", { product, quantity, selectedColor });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Product Images */}
      <div className="lg:col-span-5">
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
            {product.discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                -{product.discount}%
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square relative bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index
                    ? "border-green-500"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Product Info */}
      <div className="lg:col-span-7">
        <div className="space-y-6">
          {/* Product Header */}
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span>Thương hiệu:</span>
              <span className="text-green-600 font-medium">
                {product.brand}
              </span>
              <span>|</span>
              <span>Loại:</span>
              <span className="text-green-600 font-medium">
                {product.category}
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
                <span className="text-sm text-gray-600 ml-1">
                  ({product.reviewCount} đánh giá)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors"
                >
                  {isFavorite ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                  <span className="text-sm">Yêu thích</span>
                </button>
                <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors">
                  <FaShare className="w-4 h-4" />
                  <span className="text-sm">Chia sẻ</span>
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-red-600">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Product Options */}
          <div className="space-y-4">
            {/* Color Selection */}
            <div>
              <div className="text-sm font-medium text-gray-900 mb-2">
                Màu sắc: <span className="font-normal">{selectedColor}</span>
              </div>
              <div className="flex gap-2">
                {["Đen", "Trắng", "Bạc"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                      selectedColor === color
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <div className="text-sm font-medium text-gray-900 mb-2">
                Số lượng:
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.inStock ? "Còn hàng" : "Hết hàng"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                product.inStock
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FaShoppingCart className="w-5 h-5" />
              {product.inStock ? "THÊM VÀO GIỎ" : "HẾT HÀNG"}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                product.inStock
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {product.inStock ? "MUA NGAY" : "HẾT HÀNG"}
            </button>
          </div>

          {/* Product Features */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              CAM KẾT BÁN HÀNG
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <FaCheck className="text-green-600 w-4 h-4" />
                <span>Hàng chính hãng. Nguồn gốc rõ ràng</span>
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-green-600 w-4 h-4" />
                <span>Bảo hành chính hãng toàn quốc</span>
              </div>
              <div className="flex items-center gap-2">
                <FaTruck className="text-green-600 w-4 h-4" />
                <span>Hỗ trợ giao hàng toàn quốc</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUndo className="text-green-600 w-4 h-4" />
                <span>Hỗ trợ đổi mới trong vòng 30 ngày</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FaPhone className="text-green-600 w-5 h-5" />
              <div>
                <div className="text-sm text-gray-600">
                  Tư vấn bán hàng (Miễn phí)
                </div>
                <div className="font-semibold text-green-600">02899998399</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="lg:col-span-12 mt-12">
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {[
                { id: "description", label: "Mô tả sản phẩm" },
                { id: "specifications", label: "Thông số kỹ thuật" },
                { id: "reviews", label: `Đánh giá (${product.reviewCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-green-600 border-b-2 border-green-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "description" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Mô tả sản phẩm</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Tính năng nổi bật
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <FaCheck className="text-green-600 w-4 h-4 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Thông số kỹ thuật
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b border-gray-200"
                      >
                        <span className="font-medium text-gray-900">
                          {key}:
                        </span>
                        <span className="text-gray-700">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Đánh giá từ khách hàng
                </h3>
                <div className="text-center py-12 text-gray-500">
                  <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                  <p className="text-sm mt-2">
                    Hãy là người đầu tiên đánh giá sản phẩm!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductClient;
