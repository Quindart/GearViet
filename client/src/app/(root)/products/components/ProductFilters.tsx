"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaFilter, FaTimes } from "react-icons/fa";
import { getAllCategories } from "@/services/categoryApi";
import { getAllBrands } from "@/services/productApi";
import { Category } from "@/types/category";
import { Brand } from "@/types/product";

interface ProductFiltersProps {
  onFiltersChange: (filters: {
    categoryId?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }) => void;
}

export default function ProductFilters({ onFiltersChange }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filters, setFilters] = useState({
    categoryId: searchParams.get("category") || "",
    brand: searchParams.get("brand") || "",
    minPrice: searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice") || "0") : undefined,
    maxPrice: searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice") || "0") : undefined,
    sort: searchParams.get("sort") || "newest",
  });

  useEffect(() => {
    const loadData = async () => {
      const [categoriesData, brandsData] = await Promise.all([
        getAllCategories(),
        getAllBrands(),
      ]);
      setCategories(categoriesData);
      setBrands(brandsData);
    };
    loadData();
  }, []);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key: string, value: string | number | undefined) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    const params = new URLSearchParams();
    if (newFilters.categoryId) params.set("category", newFilters.categoryId);
    if (newFilters.brand) params.set("brand", newFilters.brand);
    if (newFilters.minPrice) params.set("minPrice", String(newFilters.minPrice));
    if (newFilters.maxPrice) params.set("maxPrice", String(newFilters.maxPrice));
    if (newFilters.sort) params.set("sort", newFilters.sort);

    router.push(`/products?${params.toString()}`);
  };

  const handleReset = () => {
    const resetFilters = {
      categoryId: "",
      brand: "",
      minPrice: undefined,
      maxPrice: undefined,
      sort: "newest",
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
    router.push("/products");
  };

  const hasActiveFilters = () => {
    return !!(filters.categoryId || filters.brand || filters.minPrice || filters.maxPrice);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <FaFilter />
          {showFilters ? "Ẩn bộ lọc" : "Hiển thị bộ lọc"}
        </button>
        {hasActiveFilters() && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FaTimes />
            Xóa bộ lọc
          </button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Danh mục
            </label>
            <select
              value={filters.categoryId}
              onChange={(e) => handleFilterChange("categoryId", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thương hiệu
            </label>
            <select
              value={filters.brand}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Tất cả thương hiệu</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giá tối thiểu (VNĐ)
            </label>
            <input
              type="number"
              value={filters.minPrice || ""}
              onChange={(e) =>
                handleFilterChange("minPrice", e.target.value ? parseInt(e.target.value) : undefined)
              }
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giá tối đa (VNĐ)
            </label>
            <input
              type="number"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                handleFilterChange("maxPrice", e.target.value ? parseInt(e.target.value) : undefined)
              }
              placeholder="Không giới hạn"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
      )}

      {/* Sort Options */}
      <div className="pt-4 border-t border-gray-200 mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sắp xếp theo
        </label>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleFilterChange("sort", "newest")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filters.sort === "newest"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Mới nhất
          </button>
          <button
            onClick={() => handleFilterChange("sort", "price-asc")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filters.sort === "price-asc"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Giá tăng dần
          </button>
          <button
            onClick={() => handleFilterChange("sort", "price-desc")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filters.sort === "price-desc"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Giá giảm dần
          </button>
          <button
            onClick={() => handleFilterChange("sort", "name")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filters.sort === "name"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Tên A-Z
          </button>
          <button
            onClick={() => handleFilterChange("sort", "best-selling")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filters.sort === "best-selling"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Bán chạy
          </button>
        </div>
      </div>
    </div>
  );
}

