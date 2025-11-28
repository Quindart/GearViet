"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatVNDPrice } from "@/utils/product";
import { FaSearch, FaSpinner } from "react-icons/fa";

interface SearchResultsProps {
  products: Product[];
  loading: boolean;
  query: string;
  onClose: () => void;
}

export default function SearchResults({
  products,
  loading,
  query,
  onClose,
}: SearchResultsProps) {
  if (!query.trim()) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[500px] overflow-y-auto z-50">
      {loading ? (
        <div className="p-6 flex items-center justify-center gap-3 text-gray-600">
          <FaSpinner className="animate-spin" />
          <span>Đang tìm kiếm...</span>
        </div>
      ) : products.length === 0 ? (
        <div className="p-6 text-center text-gray-600">
          <FaSearch className="mx-auto mb-2 text-gray-400" />
          <p className="text-sm">Không tìm thấy sản phẩm nào</p>
          <p className="text-xs text-gray-500 mt-1">
            Thử tìm kiếm với từ khóa khác
          </p>
        </div>
      ) : (
        <>
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <p className="text-sm font-medium text-gray-700">
              Tìm thấy {products.length} sản phẩm
            </p>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {products.slice(0, 8).map((product) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                onClick={onClose}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={
                      product.images && product.images[0]
                        ? product.images[0].url
                        : product.image
                        ? product.image.url
                        : "/images/placeholder-product.svg"
                    }
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-1">
                    {product.brand && product.category
                      ? `${product.brand} • ${product.category}`
                      : product.brand || product.category}
                  </p>
                  <p className="text-sm font-bold text-red-600">
                    {formatVNDPrice(product.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {products.length > 8 && (
            <div className="p-3 border-t border-gray-200 bg-gray-50 text-center">
              <Link
                href={`/products?search=${encodeURIComponent(query)}`}
                onClick={onClose}
                className="text-sm font-medium text-green-600 hover:text-green-700"
              >
                Xem tất cả {products.length} kết quả →
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

