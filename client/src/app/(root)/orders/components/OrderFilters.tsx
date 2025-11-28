"use client";

import { FaSearch } from "react-icons/fa";

interface OrderFiltersProps {
  filters: {
    status: string;
    search: string;
  };
  onFiltersChange: (filters: { status: string; search: string }) => void;
}

export default function OrderFilters({ filters, onFiltersChange }: OrderFiltersProps) {
  const handleStatusChange = (status: string) => {
    onFiltersChange({ ...filters, status });
  };

  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Tìm kiếm theo mã đơn hàng..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleStatusChange("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filters.status === "all"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => handleStatusChange("pending")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filters.status === "pending"
                ? "bg-yellow-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Chờ xử lý
          </button>
          <button
            onClick={() => handleStatusChange("processing")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filters.status === "processing"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Đang xử lý
          </button>
          <button
            onClick={() => handleStatusChange("completed")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filters.status === "completed"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Hoàn thành
          </button>
          <button
            onClick={() => handleStatusChange("cancelled")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filters.status === "cancelled"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Đã hủy
          </button>
        </div>
      </div>
    </div>
  );
}

