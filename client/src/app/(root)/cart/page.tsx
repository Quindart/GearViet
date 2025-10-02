import Breadcrumb, { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { FaShoppingCart } from "react-icons/fa";
import { CartManager, RecentlyViewed, type CartItem, type RecentProduct } from "./components";

// Mock data for cart items - In real app, this would come from API/database
const getMockCartItems = async (): Promise<CartItem[]> => {
  return [
    {
      id: 1,
      name: "Bộ Vi Xử Lý - CPU AMD Ryzen 5 5600GT / 3.6GHz Boost 4.4GHz / 6 Nhân 12 Luồng / 16MB / AM4",
      price: 3890000,
      originalPrice: 4200000,
      quantity: 1,
      image: "https://placehold.co/180/png",
      inStock: true,
    },
    {
      id: 2,
      name: "Bộ máy tính TGG GOLD I | 12TH",
      price: 11790000,
      originalPrice: 12490000,
      quantity: 1,
      image: "https://placehold.co/180/png",
      inStock: true,
    },
  ];
};

// Mock data for recently viewed products - In real app, this would come from API/database
const getMockRecentlyViewed = async (): Promise<RecentProduct[]> => {
  return [
    {
      id: 3,
      name: "Bộ Vi Xử Lý - CPU AMD Ryzen 5 5500GT / 3.6GHz Boost 4.2GHz",
      price: 3750000,
      originalPrice: 4000000,
      image: "https://placehold.co/180/png",
    },
    {
      id: 4,
      name: "Card màn hình MSI GeForce RTX 4060",
      price: 8990000,
      originalPrice: 9500000,
      image: "https://placehold.co/180/png",
    },
    {
      id: 5,
      name: "RAM Corsair Vengeance LPX 16GB",
      price: 1290000,
      originalPrice: 1450000,
      image: "https://placehold.co/180/png",
    },
  ];
};

export default async function CartPage() {
  // Fetch data server-side
  const cartItems = await getMockCartItems();
  const recentlyViewed = await getMockRecentlyViewed();

  const breadcrumbItems: BreadcrumbItem[] = [
    { 
      label: "Trang chủ", 
      href: "/" 
    },
    { 
      label: "Giỏ hàng", 
      icon: <FaShoppingCart className="w-4 h-4" /> 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Cart Content */}
        <CartManager initialItems={cartItems} />

        {/* Recently Viewed Products */}
        <div className="mt-6">
          <RecentlyViewed products={recentlyViewed} />
        </div>
      </div>
    </div>
  );
}
