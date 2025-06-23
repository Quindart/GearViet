import Breadcrumb, { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { FaShoppingCart } from "react-icons/fa";
import CartClient from "./CartClient";
const CartPage = () => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Giỏ hàng", icon: <FaShoppingCart className="w-4 h-4" /> },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {" "}
      <div className="container mx-auto px-4 py-6">
        {" "}
        {/* Breadcrumb */}{" "}
        <div className="mb-6">
          {" "}
          <Breadcrumb items={breadcrumbItems} />{" "}
        </div>{" "}
        {/* Cart Content */} <CartClient />{" "}
      </div>{" "}
    </div>
  );
};
export default CartPage;
