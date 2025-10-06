"use client";

import Image from "next/image";
import { useState } from "react";
import { FaCheck, FaShieldAlt, FaTruck, FaUndo } from "react-icons/fa";
import { formatVNDPrice } from "../../../../utils/product";
import { logger } from "../../../../utils/logger";

// Product interface for the product page
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
  const [selectedColor, setSelectedColor] = useState("Đen");

  const handleAddToCart = () => {
    // Add to cart logic
    logger.info("Product added to cart", { 
      productId: product.id, 
      productName: product.name,
      quantity, 
      selectedColor 
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      {/* Left Column - Product Images */}
      <div className="lg:col-span-4 bg-white p-4 rounded-tl-lg rounded-bl-lg">
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {product.discount > 0 && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                Tiết kiệm {product.discount}%
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-5 gap-2">
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

      {/* Center Column - Product Info */}
      <div className="lg:col-span-5 bg-white p-4 rounded-tr-lg rounded-br-lg">
        <div className="space-y-4">
          {/* Product Header */}
          <div>
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
              {product.name}{" "}
              <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                Còn Hàng
              </span>
            </h1>

            <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
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

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-red-600">
                {formatVNDPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-500 line-through">
                  {formatVNDPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Product Options */}
          <div className="space-y-4">
            {/* Color Selection */}
            <div>
              <div className="text-sm font-medium text-gray-900 mb-2">
                Màu sắc:
              </div>
              <div className="flex gap-2">
                {["Đen"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg text-sm transition-colors flex items-center gap-2 ${
                      selectedColor === color
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="w-4 h-4 bg-black rounded border border-gray-300"></div>
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
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors text-lg"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                product.inStock
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {product.inStock ? "THÊM VÀO GIỎ" : "HẾT HÀNG"}
              <div className="text-xs mt-1">
                Giao Tận Nơi Hoặc Nhận Tại Cửa Hàng
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="lg:col-span-3 bg-white ml-4 rounded-lg">
        <div className="space-y-4 p-4">
          {/* Chính Sách Bán Hàng */}
          <div className="rounded-md border border-green-200 overflow-hidden">
            <h3 className="font-semibold bg-primary text-white p-2">
              Cam kết bán hàng
            </h3>
            <div className="grid grid-cols-1 gap-2 text-sm p-4">
              <div className="flex items-center gap-2">
                <FaCheck className="text-green-600 w-4 h-4" />
                <span>Hàng chính hãng. Nguồn gốc rõ ràng</span>
              </div>
              <div className="flex items-center gap-2">
                <FaTruck className="text-green-600 w-4 h-4" />
                <span>Hỗ trợ giao hàng toàn quốc</span>
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-green-600 w-4 h-4" />
                <span>Bảo hành chính hãng toàn quốc</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUndo className="text-green-600 w-4 h-4" />
                <span>Hỗ trợ đổi mới trong vòng 30 ngày</span>
              </div>
            </div>
          </div>

          {/* Chính Sách Bán Hàng */}
          <div className="rounded-md border border-green-200 overflow-hidden">
            <h3 className="font-semibold bg-primary text-white p-2">
              Chính Sách Bán Hàng
            </h3>
            <div className="text-sm p-4">
              <div className="flex items-start gap-2">
                <FaCheck className="text-green-600 w-3 h-3 mt-1 flex-shrink-0" />
                <span>Hỗ trợ đổi mới trong vòng 7 ngày.</span>
              </div>
              <div className="flex items-start gap-2">
                <FaCheck className="text-green-600 w-3 h-3 mt-1 flex-shrink-0" />
                <span>Bảo hành chính hãng 24 tháng toàn quốc.</span>
              </div>
              <div className="flex items-start gap-2">
                <FaCheck className="text-green-600 w-3 h-3 mt-1 flex-shrink-0" />
                <span>Hỗ trợ trả góp lãi suất 0% qua MPOS.</span>
              </div>
              <div className="flex items-start gap-2">
                <FaCheck className="text-green-600 w-3 h-3 mt-1 flex-shrink-0" />
                <span>Hỗ trợ giao hàng toàn quốc.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="lg:col-span-12 mt-8">
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <div className="px-6 py-4 font-medium text-green-600 border-b-2 border-green-600">
                Mô tả sản phẩm
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductClient;
