"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import {
  FaHeart,
  FaRegHeart,
  FaRegStar,
  FaShoppingCart,
  FaStar,
  FaSearch,
} from "react-icons/fa";
import { Product } from "@/types/product";
import { useCartStore } from "@/store";
import EmptyState from "@/components/shared/EmptyState";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { searchProduct, filterProduct } from "@/services/productApi";
import ProductFilters from "./components/ProductFilters";

interface ProductsClientProps {
  initialProducts: Product[];
  initialFilters?: {
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    search?: string;
  };
}

const ProductsClient: React.FC<ProductsClientProps> = ({
  initialProducts: products,
  initialFilters,
}) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState(initialFilters?.search || "");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(!!initialFilters?.search);
  const [filters, setFilters] = useState<{
    categoryId?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }>({
    categoryId: initialFilters?.category,
    brand: initialFilters?.brand,
    minPrice: initialFilters?.minPrice ? parseInt(initialFilters.minPrice) : undefined,
    maxPrice: initialFilters?.maxPrice ? parseInt(initialFilters.maxPrice) : undefined,
    sort: initialFilters?.sort || "newest",
  });
  const [isFiltering, setIsFiltering] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { enqueueSnackbar } = useSnackbar();

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FaStar key={i} className="w-3 h-3 text-yellow-400 fill-current" />
        );
      } else {
        stars.push(<FaRegStar key={i} className="w-3 h-3 text-gray-300" />);
      }
    }
    return stars;
  };

  const toggleFavorite = (productId: string) => {
    const numId = parseInt(productId);
    setFavorites((prev) =>
      prev.includes(numId)
        ? prev.filter((id) => id !== numId)
        : [...prev, numId]
    );
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    enqueueSnackbar(
      `Đã thêm ${product.name} vào giỏ hàng`,
      { 
        variant: 'success',
        autoHideDuration: 3000,
      }
    );
  };

  useEffect(() => {
    const applyFilters = async () => {
      if (!filters.categoryId && !filters.brand && !filters.minPrice && !filters.maxPrice) {
        setAllProducts(products);
        return;
      }

      setIsFiltering(true);
      try {
        const filterParams: {
          categoryId?: string;
          brand?: string;
          minPrice?: number;
          maxPrice?: number;
          sort?: string;
        } = {};

        if (filters.categoryId) filterParams.categoryId = filters.categoryId;
        if (filters.brand) filterParams.brand = filters.brand;
        if (filters.minPrice) filterParams.minPrice = filters.minPrice;
        if (filters.maxPrice) filterParams.maxPrice = filters.maxPrice;
        if (filters.sort) filterParams.sort = filters.sort;

        const filtered = await filterProduct(filterParams);
        setAllProducts(filtered);
      } catch (error) {
        console.error("Filter error:", error);
        setAllProducts(products);
      } finally {
        setIsFiltering(false);
      }
    };

    applyFilters();
  }, [filters, products]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      const results = await searchProduct(searchQuery);
      setAllProducts(results);
      
      if (results.length === 0) {
        enqueueSnackbar("Không tìm thấy sản phẩm nào", { variant: "info" });
      }
    } catch (error) {
      console.error("Search error:", error);
      enqueueSnackbar("Có lỗi xảy ra khi tìm kiếm", { variant: "error" });
      setAllProducts(products);
    } finally {
      setIsSearching(false);
    }
  };

  const sortedProducts = useMemo(() => {
    const sorted = [...allProducts];
    
    if (filters.sort === "newest") {
      sorted.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    } else if (filters.sort === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sort === "best-selling") {
      sorted.sort((a, b) => (b.selling || 0) - (a.selling || 0));
    }
    
    return sorted;
  }, [allProducts, filters.sort]);

  const displayProducts = sortedProducts;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <ProductFilters onFiltersChange={setFilters} />

      {/* Search Bar */}
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Tìm kiếm sản phẩm..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <FaSearch />
          {isSearching ? "Đang tìm..." : "Tìm kiếm"}
        </button>
      </div>

      {/* Products Grid */}
      {isSearching || isFiltering ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : displayProducts.length === 0 ? (
        <EmptyState
          title="Không tìm thấy sản phẩm"
          message={hasSearched ? "Thử tìm kiếm với từ khóa khác" : "Không có sản phẩm nào"}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg group"
        >
          {/* Product Image */}
          <div className="relative aspect-square p-4">
            <Link href={`/products/${product._id}`}>
              <Image
                src={product.images?.[0]?.url || product.image?.url || "/images/placeholder-product.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </Link>
            <button
              onClick={() => toggleFavorite(product._id)}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              {favorites.includes(parseInt(product._id)) ? (
                <FaHeart className="w-4 h-4 text-red-500" />
              ) : (
                <FaRegHeart className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-3">
            {product.brand && product.category && (
              <div className="text-xs text-gray-500">
                {product.brand} • {product.category}
              </div>
            )}

            <Link href={`/products/${product._id}`}>
              <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-green-600 transition-colors">
                {product.name}
              </h3>
            </Link>

            {/* Rating */}
            {product.avg_review && (
              <div className="flex items-center gap-1">
                {renderStars(product.avg_review)}
                {product.totalComment && (
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.totalComment})
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="space-y-1">
              <div className="text-lg font-bold text-red-600">
                {formatPrice(product.price)}
              </div>
            </div>

            {/* Stock Status */}
            <div className="text-sm">
              {product.available > 0 ? (
                <span className="text-green-600">✓ Còn hàng ({product.available})</span>
              ) : (
                <span className="text-red-600">✗ Hết hàng</span>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={(e) => handleAddToCart(product, e)}
              disabled={product.available === 0}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                product.available > 0
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FaShoppingCart className="w-4 h-4" />
              {product.available > 0 ? "Thêm vào giỏ" : "Hết hàng"}
            </button>
          </div>
        </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsClient;
