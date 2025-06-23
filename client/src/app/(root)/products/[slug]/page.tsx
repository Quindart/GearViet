import Breadcrumb, { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";

// Mock product data - In real app, this would come from API/database
const getProduct = async (slug: string) => {
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
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: "Sản phẩm mới",
      href: "/products",
    },
    {
      label: product.category,
      href: `/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`,
    },
    {
      label: product.name,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Product Content */}
        <ProductClient product={product} />
      </div>
    </div>
  );
}
