"use client";

import { Order } from "@/types/order";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

interface OrderTimelineProps {
  order: Order;
}

const getStatusSteps = (status: string) => {
  const statusLower = status.toLowerCase();
  const steps = [
    {
      label: "Đặt hàng",
      status: "pending",
      icon: FaClock,
      completed: true,
    },
    {
      label: "Đang xử lý",
      status: "processing",
      icon: FaClock,
      completed: statusLower.includes("processing") || statusLower.includes("completed"),
    },
    {
      label: "Hoàn thành",
      status: "completed",
      icon: FaCheckCircle,
      completed: statusLower.includes("completed"),
    },
  ];

  if (statusLower.includes("cancelled") || statusLower.includes("hủy")) {
    return [
      {
        label: "Đặt hàng",
        status: "pending",
        icon: FaCheckCircle,
        completed: true,
      },
      {
        label: "Đã hủy",
        status: "cancelled",
        icon: FaTimesCircle,
        completed: true,
        isCancelled: true,
      },
    ];
  }

  return steps;
};

export default function OrderTimeline({ order }: OrderTimelineProps) {
  const steps = getStatusSteps(order.status);

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Trạng thái đơn hàng</h2>

      <div className="relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === steps.length - 1;

          return (
            <div key={index} className="relative pb-8">
              {!isLast && (
                <div
                  className={`absolute left-5 top-10 w-0.5 h-full ${
                    step.completed ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}

              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    step.completed
                      ? step.isCancelled
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      step.completed ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.completed && (
                    <p className="text-sm text-gray-500 mt-1">
                      {step.status === "pending" && formatDate(order.createdAt)}
                      {step.status === "processing" && order.updatedAt && formatDate(order.updatedAt)}
                      {step.status === "completed" && order.updatedAt && formatDate(order.updatedAt)}
                      {step.isCancelled && order.updatedAt && formatDate(order.updatedAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

