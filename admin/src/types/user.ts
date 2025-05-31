export interface LoginValuesType {
  username: string;
  password: string;
  remember: boolean;
}
export interface RegisterValueType {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}
export interface IUser {
  username: string;
  role: string;
  email: string;
  _id: string;
  status: string;
  name: string;
  gender: string;
  address: {
    province: {
      provinceId: number;
      provinceName: string;
    };
    district: {
      districtId: number;
      districtName: string;
    };
    ward: {
      wardId: number;
      wardName: string;
    };
    detail: string;
  };
  phone: string;
  avatar: {
    url: string;
    public_id: string;
  };
}

export interface EditUserType {
  role?: string;
  status?: string;
  disable?: boolean;
}

export interface ForgotPasswordFormDataType {
  email: string;
  username: string;
}
