export interface Address {
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
}

export interface User {
  _id: string;
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  gender: string;
  address?: Address;
  avatar?: {
    url: string;
    public_id: string;
  };
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  gender?: string;
  address?: Address;
  avatar?: {
    url: string;
    public_id: string;
  };
}

