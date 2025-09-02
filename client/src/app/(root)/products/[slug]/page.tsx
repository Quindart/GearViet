import Breadcrumb, { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { notFound } from "next/navigation";
import { Product } from "@/types/product-page";
import {
  ProductHeader,
  ProductImageGallery,
  ProductOptions,
  ProductPolicies,
  ProductDescription,
  ProductReview,
} from "./components";

// Mock product data - In real app, this would come from API/database
const getProduct = async (slug: string): Promise<Product | null> => {
  // Simulate API call
  const products = {
    "gia-treo-man-hinh-hyperwork-t9-pro-iii-24-57inch": {
      id: 1,
      name: "Giá Treo Màn Hình - HyperWork T9 Pro III / 24 - 57inch",
      brand: "Hyper Work",
      category: "Giá treo màn hình",
      price: 2390000,
      originalPrice: 2790000,
      discount: 14,
      inStock: true,
      rating: 4.8,
      reviewCount: 127,
      warranty: "24 tháng toàn quốc",
      description:
        "Giá treo màn hình HyperWork T9 Pro III hỗ trợ màn hình từ 24-57 inch, tải trọng lên đến 35kg. Thiết kế chắc chắn, dễ lắp đặt.",
      features: [
        "Hỗ trợ màn hình 24-57 inch",
        "Tải trọng tối đa 35kg",
        "Xoay 360°, nghiêng ±15°",
        "Chất liệu thép carbon cao cấp",
        "Lắp đặt dễ dàng",
      ],
      specifications: {
        "Kích thước màn hình": "24 - 57 inch",
        "Tải trọng tối đa": "35kg",
        "Góc xoay": "360°",
        "Góc nghiêng": "±15°",
        "Chất liệu": "Thép carbon",
        "Màu sắc": "Đen",
        "Bảo hành": "24 tháng",
      },
      images: [
        "https://placehold.co/600x400/png",
        "https://placehold.co/600x400/png",
        "https://placehold.co/600x400/png",
        "https://placehold.co/600x400/png",
      ],
      tags: ["Giá treo", "Màn hình", "HyperWork", "24-57 inch"],
    },
  };

  return products[slug as keyof typeof products] || null;
};

export async function generateStaticParams() {
  // In real app, fetch all product slugs from API
  return [{ slug: "gia-treo-man-hinh-hyperwork-t9-pro-iii-24-57inch" }];
}

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: "Trang chủ",
      href: "/",
    },
    {
      label: "SẢN PHẨM MỚI",
      href: "/products",
    },
    {
      label: product.name,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-2">
        {/* Breadcrumb */}
        <div className="mb-2">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column - Product Images */}
          <div className="lg:col-span-4 bg-white p-4 rounded-tl-lg rounded-bl-lg">
            <ProductImageGallery product={product} />
          </div>

          {/* Center Column - Product Info */}
          <div className="lg:col-span-5 bg-white p-4 rounded-tr-lg rounded-br-lg">
            <div className="space-y-4">
              <ProductHeader product={product} />
              <ProductOptions product={product} />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 bg-white ml-4 rounded-lg p-4">
            <ProductPolicies />
          </div>
        </div>

        {/* Product Description - Full Width */}
        <div className="mt-8">
          <ProductDescription product={product} />
        </div>

        {/* Product Review - Full Width */}
        <div className="mt-8">
          <ProductReview productId={product.id} />
        </div>

      </div>
    </div>
  );
}
