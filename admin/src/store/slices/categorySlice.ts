import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Categories } from 'types';

export type AppStateType = {
  isLoading: boolean;
  categories: Categories[];
  isShowEditCategory: boolean;
  isShowEditSubcategory: boolean;
  isShowDeleteCategory: boolean;
  isShowDeleteSubcategory: boolean;
  isShowAddCategory: boolean;
  isShowAddSubcategory: boolean;
};

const initialState: AppStateType = {
  isLoading: false,
  categories: [],
  isShowEditCategory: false,
  isShowEditSubcategory: false,
  isShowDeleteCategory: false,
  isShowDeleteSubcategory: false,
  isShowAddCategory: false,
  isShowAddSubcategory: false,
};

export const categorySlice = createSlice({
  name: 'categorySlice',
  initialState,
  reducers: {
    setLoading: (state: AppStateType) => {
      state.isLoading = !state.isLoading;
    },
    setCategories: (state: AppStateType, action: PayloadAction<Categories[]>) => {
      state.categories = action.payload;
    },
    toggleAddCategory: (state: AppStateType, action: PayloadAction<boolean>) => {
      state.isShowAddCategory = action.payload;
    },
    toggleAddSubcategory: (state: AppStateType, action: PayloadAction<boolean>) => {
      state.isShowAddSubcategory = action.payload;
    },
    toggleEditCategory: (state: AppStateType, action: PayloadAction<boolean>) => {
      state.isShowEditCategory = action.payload;
    },
    toggleEditSubcategory: (state: AppStateType, action: PayloadAction<boolean>) => {
      state.isShowEditSubcategory = action.payload;
    },
    toggleDeleteCategory: (state: AppStateType, action: PayloadAction<boolean>) => {
      state.isShowDeleteCategory = action.payload;
    },
    toggleDeleteSubcategory: (state: AppStateType, action: PayloadAction<boolean>) => {
      state.isShowDeleteSubcategory = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCategories,
  setLoading,
  toggleAddCategory,
  toggleAddSubcategory,
  toggleDeleteCategory,
  toggleDeleteSubcategory,
  toggleEditCategory,
  toggleEditSubcategory,
} = categorySlice.actions;

export default categorySlice.reducer;
