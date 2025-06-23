import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Product {
  id: number;
  name: string;
  image: string;
  originalPrice?: number;
  salePrice: number;
  discount?: number;
  href: string;
}

interface ProductGridProps {
  products: Product[];
  viewAllHref: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, viewAllHref }) => {
  // Show only first 8 products (2 rows of 4)
  const displayProducts = products.slice(0, 8);

  return (
    <div className="p-6">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {displayProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
          >
            <Link href={product.href} className="block">
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={250}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    -{product.discount}%
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 min-h-[40px] group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-bold text-lg">
                    {product.salePrice.toLocaleString("vi-VN")}đ
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through text-sm">
                      {product.originalPrice.toLocaleString("vi-VN")}đ
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center">
        <Link
          href={viewAllHref}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
        >
          Xem tất cả »
        </Link>
      </div>
    </div>
  );
};

export default ProductGrid;
