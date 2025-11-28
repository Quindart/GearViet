import Breadcrumb, { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { FaList } from "react-icons/fa";
import ProductsClient from "./ProductsClient";
import { getAllProducts, filterProduct } from "@/services/productApi";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    search?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  let products;

  if (params.search) {
    const { searchProduct } = await import("@/services/productApi");
    products = await searchProduct(params.search);
  } else if (params.category || params.brand || params.minPrice || params.maxPrice) {
    const filterParams: {
      categoryId?: string;
      brand?: string;
      minPrice?: number;
      maxPrice?: number;
      sort?: string;
    } = {};

    if (params.category) filterParams.categoryId = params.category;
    if (params.brand) filterParams.brand = params.brand;
    if (params.minPrice) filterParams.minPrice = parseInt(params.minPrice);
    if (params.maxPrice) filterParams.maxPrice = parseInt(params.maxPrice);
    if (params.sort) filterParams.sort = params.sort;

    products = await filterProduct(filterParams);
  } else {
    products = await getAllProducts({ page: 1, limit: 40 });
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: "Trang chủ",
      href: "/",
    },
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
        <ProductsClient initialProducts={products} initialFilters={params} />
      </div>
    </div>
  );
}
