import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  changeProductStatus,
  fetchAllProduct,
  fetchBestSellingProduct,
  fetchNewestProduct,
  fetchTotalProductByTime,
  filterProductService,
  searchingProduct,
} from 'services/productApi';
import { RootState } from 'store';
import { setProductList, setProductRenderType, setTotalRows } from 'store/slices/productSlice';
import { ResponseType } from 'types';
import { KeywordSearchEnum } from 'types/enum';
import { ProductDataType } from 'types/product';
import { formatProductList } from 'utils/helper';
import { renderType } from 'utils/app-config';

type FilterProductParamType = {
  brand?: string[];
  discount?: number;
  rating?: number;
  subCategoryId?: string;
};

const useProduct = () => {
  const productList = useSelector((state: RootState) => state.product.productList);
  const totalRows = useSelector((state: RootState) => state.product.totalRows);
  const { enqueueSnackbar } = useSnackbar();
  const [bestSellingProduct, setBestSellingProduct] = useState<ProductDataType[]>();
  const [newestProduct, setNewestProduct] = useState<ProductDataType[]>();
  const dispatch = useDispatch();
  const [totalProductByTime, setTotalProductByTime] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);

  const getAllProduct = async (page?: number, limit?: number) => {
    dispatch(setProductList([]));

    try {
      const res: ResponseType = await fetchAllProduct(page, limit);
      if (res.success && res.products && res.totalRows) {
        const productList = formatProductList(res.products);
        dispatch(setProductList(productList));
        dispatch(setTotalRows(res.totalRows));
      }
    } catch (error) {
      if (isAxiosError(error)) {
        enqueueSnackbar('Vui lòng thử lại sau', { variant: 'error' });
      }
    }
  };

  const searchProduct = async (keyword: string, text: string) => {
    let code = '';
    let name = '';
    switch (keyword) {
      case KeywordSearchEnum.CODE:
        code = text;
        name = '';
        break;
      case KeywordSearchEnum.NAME:
        code = '';
        name = text;
        break;
    }
    try {
      const res: ResponseType = await searchingProduct(code, name, page, limit);
      if (res.success && res.products && res.totalRows) {
        const productList = formatProductList(res.products);
        dispatch(setProductRenderType(renderType.SEARCH));
        dispatch(setProductList(productList));
        dispatch(setTotalRows(res.totalRows));
      } else {
        dispatch(setProductRenderType(renderType.SEARCH));
        dispatch(setProductList([]));
      }
    } catch (error) {
      if (isAxiosError(error)) {
        enqueueSnackbar('Vui lòng thử lại sau', { variant: 'error' });
      }
    }
  };

  const filterProduct = async (data: FilterProductParamType) => {
    const { subCategoryId, brand, discount, rating } = data;
    let query = `page=${page}&limit=${limit}`;
    if (subCategoryId) query += `&subCategoryId=${subCategoryId}`;
    if (brand && brand.length > 0) query += `&brand=${brand}`;
    if (discount) query += `&discount=${discount}`;
    if (rating) query += `&rating=${rating}`;

    try {
      const res: ResponseType = await filterProductService(query);
      if (res.success) {
        const productList = formatProductList(res.products as ProductDataType[]);
        dispatch(setProductRenderType(renderType.FILTER));
        dispatch(setProductList(productList));
        dispatch(setTotalRows(res.totalRows as number));
      }
    } catch (error) {
      if (isAxiosError(error)) {
        enqueueSnackbar('Vui lòng thử lại sau', { variant: 'error' });
      }
    }
  };

  const updateProductStatus = async (productId: string) => {
    try {
      const res: ResponseType = await changeProductStatus(productId);
      if (res.success && res.productStatus) {
        enqueueSnackbar(
          `${res.productStatus === 'active' ? 'Active product' : 'Disable product'} successfully`,
          {
            variant: 'success',
          },
        );
        const newProductList: ProductDataType[] = productList.map((product: ProductDataType) =>
          product._id === productId ? { ...product, status: res.productStatus } : product,
        );
        dispatch(setProductList(newProductList));
        return;
      }
      enqueueSnackbar('Vui lòng thử lại sau', { variant: 'error' });
    } catch (error) {
      if (isAxiosError(error)) {
        enqueueSnackbar('Vui lòng thử lại sau', { variant: 'error' });
      }
    }
  };

  const getBestSellingProduct = async () => {
    try {
      const response: ResponseType = await fetchBestSellingProduct(5);
      console.log('response:', response);
      if (response.success && response.products) {
        setBestSellingProduct(response.products);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const getNewestProduct = async () => {
    const response: ResponseType = await fetchNewestProduct(5);
    console.log(response);
    if (response.success && response.products) {
      setNewestProduct(response.products);
    }
  };

  const getTotalProductByTime = async (time: string) => {
    const response: ResponseType = await fetchTotalProductByTime(time);
    if (response.success && response.total) {
      setTotalProductByTime(response.total);
    }
  };

  return {
    totalRows,
    productList,
    bestSellingProduct,
    newestProduct,
    totalProductByTime,
    getAllProduct,
    updateProductStatus,
    searchProduct,
    getBestSellingProduct,
    getNewestProduct,
    getTotalProductByTime,
    page,
    setPage,
    limit,
    setLimit,
    filterProduct,
  };
};

export default useProduct;
