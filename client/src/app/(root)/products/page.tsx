import Breadcrumb, { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { FaList } from "react-icons/fa";
import ProductsClient from "./ProductsClient";

// Mock function to get products - In real app, this would be an API call
const getProducts = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    {
      id: 1,
      name: "Giá Treo Màn Hình - HyperWork T9 Pro III / 24 - 57inch",
      slug: "gia-treo-man-hinh-hyperwork-t9-pro-iii-24-57inch",
      brand: "Hyper Work",
      category: "Giá treo màn hình",
      price: 2390000,
      originalPrice: 2790000,
      discount: 14,
      inStock: true,
      rating: 4.8,
      reviewCount: 127,
      image: "https://placehold.co/300x300/png",
      tags: ["Giá treo", "Màn hình", "HyperWork"],
    },
    {
      id: 2,
      name: "Bộ Vi Xử Lý - CPU AMD Ryzen 5 5600GT / 3.6GHz Boost 4.4GHz",
      slug: "cpu-amd-ryzen-5-5600gt",
      brand: "AMD",
      category: "CPU",
      price: 3890000,
      originalPrice: 4200000,
      discount: 7,
      inStock: true,
      rating: 4.6,
      reviewCount: 89,
      image: "https://placehold.co/300x300/png",
      tags: ["CPU", "AMD", "Ryzen"],
    },
    {
      id: 3,
      name: "Bộ máy tính TGG GOLD I | 12TH",
      slug: "bo-may-tinh-tgg-gold-i-12th",
      brand: "TGG",
      category: "PC Build",
      price: 11790000,
      originalPrice: 12490000,
      discount: 6,
      inStock: true,
      rating: 4.9,
      reviewCount: 203,
      image: "https://placehold.co/300x300/png",
      tags: ["PC Build", "Gaming", "TGG"],
    },
  ];
};

export default async function ProductsPage() {
  const products = await getProducts();

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: "Tất cả sản phẩm",
      icon: <FaList className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Tất cả sản phẩm
          </h1>
          <p className="text-gray-600">
            Khám phá bộ sưu tập sản phẩm công nghệ hàng đầu
          </p>
        </div>

        {/* Products Content */}
        <ProductsClient initialProducts={products} />
      </div>
    </div>
  );
}
