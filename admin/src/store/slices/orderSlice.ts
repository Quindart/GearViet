import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder } from 'types/order';
import { renderType } from 'utils/app-config';

export type OrderStateType = {
  isLoading: boolean;
  orderDetail: null;
  orderList: IOrder[];
  totalRows: number;
  orderRenderType: string;
};

const initialState: OrderStateType = {
  isLoading: false,
  orderDetail: null,
  orderList: [],
  totalRows: 0,
  orderRenderType: renderType.ALL,
};

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    setOrderList: (state: OrderStateType, action: PayloadAction<IOrder[]>) => {
      state.orderList = action.payload;
    },
    setTotalRows: (state: OrderStateType, action: PayloadAction<number>) => {
      state.totalRows = action.payload;
    },
    setOrderRenderType: (state: OrderStateType, action: PayloadAction<string>) => {
      state.orderRenderType = action.payload;
    },
  },
});

export const { setOrderList, setTotalRows, setOrderRenderType } = orderSlice.actions;

export default orderSlice.reducer;
