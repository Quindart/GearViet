import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import appReducer from './slices/appSlice';
import userReducer from './slices/userSlice';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice';
import couponReducer from './slices/couponSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    coupon: couponReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type StoreProviderPropType = {
  children: React.ReactNode;
};

const StoreProvider = (props: StoreProviderPropType) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default StoreProvider;
