import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Categories } from 'types';

export type AppStateType = {
  hideSideBar: boolean;
  isLoading: boolean;
  categories: Categories[];
  brands: string[];
  isShowProfileModal: boolean;
  isShowChangePasswordModal: boolean;
};

const initialState: AppStateType = {
  hideSideBar: false,
  isLoading: false,
  categories: [],
  brands: [],
  isShowProfileModal: false,
  isShowChangePasswordModal: false,
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setSidebar: (state: AppStateType, action: PayloadAction<boolean>) => {
      state.hideSideBar = action.payload;
    },
    changeLoadingStatus: (state: AppStateType, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCategories: (state: AppStateType, action: PayloadAction<Categories[]>) => {
      state.categories = action.payload;
    },
    setBrands: (state: AppStateType, action: PayloadAction<string[]>) => {
      state.brands = action.payload;
    },
    toggleProfileModal: (state: AppStateType) => {
      state.isShowProfileModal = !state.isShowProfileModal;
    },
    toggleChangePasswordModal: (state: AppStateType) => {
      state.isShowChangePasswordModal = !state.isShowChangePasswordModal;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSidebar,
  setCategories,
  setBrands,
  changeLoadingStatus,
  toggleProfileModal,
  toggleChangePasswordModal,
} = appSlice.actions;

export default appSlice.reducer;
