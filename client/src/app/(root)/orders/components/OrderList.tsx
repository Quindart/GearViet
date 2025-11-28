"use client";

import Link from "next/link";
import { Order } from "@/types/order";
import OrderCard from "./OrderCard";
import EmptyState from "@/components/shared/EmptyState";

interface OrderListProps {
  orders: Order[];
}

export default function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <EmptyState
        title="Chưa có đơn hàng nào"
        message="Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm ngay!"
        actionLabel="Xem sản phẩm"
        onAction={() => (window.location.href = "/products")}
      />
    );
  }

  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div className="space-y-4">
      {sortedOrders.map((order) => (
        <Link key={order._id} href={`/orders/${order._id}`}>
          <OrderCard order={order} />
        </Link>
      ))}
    </div>
  );
}

