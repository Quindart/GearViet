"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaRegStar,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  image: string;
  tags: string[];
}

interface ProductsClientProps {
  initialProducts: Product[];
}

const ProductsClient: React.FC<ProductsClientProps> = ({
  initialProducts: products,
}) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FaStar key={i} className="w-3 h-3 text-yellow-400 fill-current" />
        );
      } else {
        stars.push(<FaRegStar key={i} className="w-3 h-3 text-gray-300" />);
      }
    }
    return stars;
  };

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg group"
        >
          {/* Product Image */}
          <div className="relative aspect-square p-4">
            <Link href={`/products/${product.slug}`}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </Link>
            {product.discount > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                -{product.discount}%
              </div>
            )}
            <button
              onClick={() => toggleFavorite(product.id)}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              {favorites.includes(product.id) ? (
                <FaHeart className="w-4 h-4 text-red-500" />
              ) : (
                <FaRegHeart className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-3">
            <div className="text-xs text-gray-500">
              {product.brand} • {product.category}
            </div>

            <Link href={`/products/${product.slug}`}>
              <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-green-600 transition-colors">
                {product.name}
              </h3>
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-1">
              {renderStars(product.rating)}
              <span className="text-xs text-gray-500 ml-1">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="text-lg font-bold text-red-600">
                {formatPrice(product.price)}
              </div>
              {product.originalPrice > product.price && (
                <div className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div className="text-sm">
              {product.inStock ? (
                <span className="text-green-600">✓ Còn hàng</span>
              ) : (
                <span className="text-red-600">✗ Hết hàng</span>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              disabled={!product.inStock}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                product.inStock
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FaShoppingCart className="w-4 h-4" />
              {product.inStock ? "Thêm vào giỏ" : "Hết hàng"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsClient;
