import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'types/user';
import { renderType } from 'utils/app-config';

export type UserStateType = {
  isLoading: boolean;
  adminDetail: IUser | null;
  userList: IUser[];
  totalRows: number;
  userRenderType: string;
};

const initialState: UserStateType = {
  adminDetail: null,
  isLoading: false,
  userList: [],
  totalRows: 0,
  userRenderType: renderType.ALL,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setAdminDetail: (state: UserStateType, action: PayloadAction<IUser | null>) => {
      state.adminDetail = action.payload;
    },
    setUserList: (state: UserStateType, action: PayloadAction<IUser[]>) => {
      state.userList = action.payload;
    },
    setTotalRows: (state: UserStateType, action: PayloadAction<number>) => {
      state.totalRows = action.payload;
    },
    setUserRenderType: (state: UserStateType, action: PayloadAction<string>) => {
      state.userRenderType = action.payload;
    },
  },
});

export const { setAdminDetail, setUserList, setTotalRows, setUserRenderType } = userSlice.actions;

export default userSlice.reducer;
