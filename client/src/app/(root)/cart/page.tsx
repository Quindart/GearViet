"use client";

import Breadcrumb, { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { FaShoppingCart } from "react-icons/fa";
import { CartManager, RecentlyViewed } from "./components";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Cart Content */}
        <CartManager />

        {/* Recently Viewed Products */}
        <div className="mt-6">
          <RecentlyViewed />
        </div>
      </div>
    </div>
  );
}
