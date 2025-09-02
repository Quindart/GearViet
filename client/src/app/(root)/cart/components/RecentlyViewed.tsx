import Image from "next/image";

export interface RecentProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug?: string;
}

interface RecentlyViewedProps {
  products: RecentProduct[];
}

const formatPrice = (price: number) => {
  return price.toLocaleString("vi-VN") + "đ";
};

export default function RecentlyViewed({ products }: RecentlyViewedProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Sản phẩm đã xem</h3>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
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
  );
}
