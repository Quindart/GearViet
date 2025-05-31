import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductDataType } from 'types/product';
import { renderType } from 'utils/app-config';

export type ProductStateType = {
  isLoading: boolean;
  productList: ProductDataType[];
  totalRows: number;
  productRenderType: string;
  filterParams: FilterParamsType;
};

type FilterParamsType = {
  subCategoryId: string;
  brand: string[];
  discount: number;
  rating: number;
};

const initialState: ProductStateType = {
  isLoading: false,
  productList: [],
  totalRows: 0,
  productRenderType: renderType.ALL,
  filterParams: {
    subCategoryId: '',
    brand: [],
    discount: 0,
    rating: 0,
  },
};

export const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    setProductList: (state: ProductStateType, action: PayloadAction<ProductDataType[]>) => {
      state.productList = action.payload;
    },
    setTotalRows: (state: ProductStateType, action: PayloadAction<number>) => {
      state.totalRows = action.payload;
    },
    setProductRenderType: (state: ProductStateType, action: PayloadAction<string>) => {
      state.productRenderType = action.payload;
    },
    setFilterParams: (state: ProductStateType, action: PayloadAction<FilterParamsType>) => {
      state.filterParams = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProductList, setTotalRows, setProductRenderType, setFilterParams } =
  productSlice.actions;

export default productSlice.reducer;
