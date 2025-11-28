import Breadcrumb, { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { notFound } from "next/navigation";
import {
  ProductHeader,
  ProductImageGallery,
  ProductOptions,
  ProductPolicies,
  ProductDescription,
  ProductReview,
} from "./components";
import ProductViewTracker from "./components/ProductViewTracker";
import { getProductById } from "@/services/productApi";
import { getReviewsByProduct } from "@/services/reviewApi";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id: productId } = await params;
  console.log("ProductPage - Fetching product with ID:", productId);
  
  const product = await getProductById(productId);
  console.log("ProductPage - Product fetched:", product);
  
  if (!product) {
    console.log("ProductPage - Product not found, calling notFound()");
    notFound();
  }

  const reviews = await getReviewsByProduct(product._id);

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: "Trang chủ",
      href: "/",
    },
    {
      label: "Sản phẩm",
      href: "/products",
    },
    {
      label: product.name,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <ProductViewTracker product={product} />
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
          <ProductReview productId={product._id} initialReviews={reviews} />
        </div>

      </div>
    </div>
  );
}
