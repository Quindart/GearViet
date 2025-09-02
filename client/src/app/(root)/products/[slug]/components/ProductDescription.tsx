import { FaCheck } from "react-icons/fa";
import { Product } from "@/types/product-page";

interface ProductDescriptionProps {
  product: Product;
}

export default function ProductDescription({ product }: ProductDescriptionProps) {
  return (
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
  );
}
