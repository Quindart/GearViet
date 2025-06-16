import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useProductStore, Product } from '@/store';

interface FilterProductParams {
  brand?: string[];
  discount?: number;
  rating?: number;
  subcategory?: string;
}

const useProduct = () => {
  const {
    products: productList,
    selectedProduct,
    totalPages: totalRows,
    currentPage: page,
    isLoading,
    fetchProducts: getAllProduct,
    fetchProductById,
    fetchBestSelling: getBestSellingProduct,
    searchProducts: searchProduct,
  } = useProductStore();

  const { enqueueSnackbar } = useSnackbar();
  const [bestSellingProduct, setBestSellingProduct] = useState<Product[]>([]);
  const [newestProduct, setNewestProduct] = useState<Product[]>([]);
  const [totalProductByTime] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const setPage = (newPage: number) => {
    getAllProduct(newPage, limit);
  };

  const handleSearchProduct = async (keyword: string, text: string) => {
    try {
      let query = '';
      if (keyword === 'code') {
        query = `code=${text}`;
      } else if (keyword === 'name') {
        query = `name=${text}`;
      }
      await searchProduct(query);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Please try again later';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  const filterProduct = async (data: FilterProductParams) => {
    const { subcategory, brand, discount, rating } = data;
    let query = `page=${page}&limit=${limit}`;
    if (subcategory) query += `&subcategory=${subcategory}`;
    if (brand && brand.length > 0) query += `&brand=${brand.join(',')}`;
    if (discount) query += `&discount=${discount}`;
    if (rating) query += `&rating=${rating}`;

    try {
      await searchProduct(query);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Please try again later';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  const loadBestSellingProducts = async () => {
    try {
      await getBestSellingProduct(5);
      if (productList.length > 0) {
        setBestSellingProduct(productList);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error loading best selling products';
      console.error(message);
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  const loadNewestProducts = async () => {
    try {
      await getAllProduct(1, 5);
      if (productList.length > 0) {
        setNewestProduct(productList);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error loading newest products';
      console.error(message);
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  // This would need to be implemented in the admin panel
  const updateProductStatus = async () => {};
  const getTotalProductByTime = async () => {};

  return {
    totalRows,
    productList,
    selectedProduct,
    bestSellingProduct,
    newestProduct,
    totalProductByTime,
    isLoading,
    getAllProduct,
    fetchProductById,
    updateProductStatus,
    searchProduct: handleSearchProduct,
    getBestSellingProduct: loadBestSellingProducts,
    getNewestProduct: loadNewestProducts,
    getTotalProductByTime,
    page,
    setPage,
    limit,
    setLimit,
    filterProduct,
  };
};

export default useProduct;
