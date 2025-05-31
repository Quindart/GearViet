import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICoupon } from 'types/coupon';
import { renderType } from 'utils/app-config';

export type CouponStateType = {
  isLoading: boolean;
  couponDetail: ICoupon | null;
  couponList: ICoupon[];
  totalRows: number;
  couponRenderType: string;
};

const initialState: CouponStateType = {
  isLoading: false,
  couponDetail: null,
  couponList: [],
  totalRows: 0,
  couponRenderType: renderType.ALL,
};

export const couponSlice = createSlice({
  name: 'couponSlice',
  initialState,
  reducers: {
    setCouponDetail: (state: CouponStateType, action: PayloadAction<ICoupon>) => {
      state.couponDetail = action.payload;
    },
    setCouponList: (state: CouponStateType, action: PayloadAction<ICoupon[]>) => {
      state.couponList = action.payload;
    },
    setTotalRows: (state: CouponStateType, action: PayloadAction<number>) => {
      state.totalRows = action.payload;
    },
    setCouponRenderType: (state: CouponStateType, action: PayloadAction<string>) => {
      state.couponRenderType = action.payload;
    },
  },
});

export const { setCouponDetail, setCouponList, setTotalRows, setCouponRenderType } =
  couponSlice.actions;

export default couponSlice.reducer;
