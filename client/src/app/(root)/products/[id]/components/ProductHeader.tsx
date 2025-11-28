import { formatVNDPrice } from "@/utils/product";
import { Product } from "@/types/product";

interface ProductHeaderProps {
  product: Product;
}

export default function ProductHeader({ product }: ProductHeaderProps) {
  return (
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
      </div>
    </div>
  );
}
