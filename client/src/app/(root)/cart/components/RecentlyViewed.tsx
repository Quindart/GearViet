"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getViewedProducts } from "@/utils/viewedProducts";
import { formatVNDPrice } from "@/utils/product";

export default function RecentlyViewed() {
  const [viewedProducts, setViewedProducts] = useState(
    getViewedProducts().map((item) => item.product)
  );

  useEffect(() => {
    const products = getViewedProducts().map((item) => item.product);
    setViewedProducts(products);
  }, []);

  if (!viewedProducts || viewedProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Sản phẩm đã xem</h3>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {viewedProducts.slice(0, 3).map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
            >
              <div className="aspect-square mb-3 relative">
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                {product.name}
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-red-600 font-bold">
                  {formatVNDPrice(product.price)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
