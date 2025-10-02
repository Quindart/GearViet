import { IOrder, OrderProductsType } from '../types/order';
import { ProductDataType } from '../types/product';
import { IUser } from '../types/user';
import { DistrictType, ProvinceType, WardType } from '../types/shipping';
// formatDates has 3 options:  'datetime' to display date(String type) and time, 'date' to display only date(String type), default if option is not define, month will display as number
export const formatDates = (date: string, option?: string) => {
  const data = new Date(date);
  if (option === 'datetime') {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(
      data,
    );
  } else if (option === 'date') {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(data);
  } else {
    return new Intl.DateTimeFormat('en-US').format(data);
  }
};

export const setValueInSession = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};
export const removeValueInSession = (key: string) => {
  sessionStorage.removeItem(key);
};

export const getValueFromSession = (key: string) => {
  const value = sessionStorage.getItem(key) || '';
  return value;
};

export const createProductCode = (productName: string) => {
  const characters: string[] = productName.split(' ').map((letter: string) =>
    letter
      .charAt(0)
      .toUpperCase()
      // remove all special unicode characters in string
      .replace(/[^\w ]/g, '')
      .trim(),
  );
  const randomNumber = Math.floor(Math.random() * 10000);
  return characters.join('') + randomNumber;
};
export const setValueInLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const removeValueInLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
export const getValueFromLocalStorage = (key: string) => {
  const value: string | null = localStorage.getItem(key);
  return value ? JSON.parse(value) : '';
};

export function formatProductList(productList: ProductDataType[]) {
  return productList.map((item: ProductDataType) => ({
    ...item,
    id: item._id,
    product: {
      url: item.images !== undefined ? item?.images[0]?.url : '',
      name: item.name,
      subcategory: item.subcategory?.name,
    },
  }));
}

export function formatOrderList(orderList: IOrder[]) {
  return orderList.map((item: IOrder) => {
    const quantities = item.products.reduce(
      (total: number, product: OrderProductsType) => total + product.quantity,
      0,
    );

    const { province, district, ward, detail } = item.shippingDetail.address;
    const address = `${detail && detail} - ${ward?.wardName} - ${district?.districtName} - ${
      province?.provinceName
    }`;

    return {
      ...item,
      id: item._id,
      code: item.code,
      name: item.shippingDetail.fullname,
      address: address,
      phone: item.shippingDetail.phone,
      email: item.shippingDetail.email,
      dateCreated: item.createdAt,
      quantities: quantities,
      paymentType: item.paymentType,
      paymentStatus: item.paymentStatus,
    };
  });
}

export function formatUserDropDownList(userList: IUser[]) {
  const list = userList.map((item: IUser) => ({
    _id: item._id,
    name: item.username,
  }));
  return list;
}

export function formatProvinceDropDownList(provinceList: ProvinceType[]) {
  const list = provinceList.map((item: ProvinceType) => ({
    _id: item.ProvinceID,
    name: item.ProvinceName,
  }));
  return list;
}

export function formatDistrictDropdownList(districtList: DistrictType[]) {
  const list = districtList.map((item: DistrictType) => ({
    _id: item.DistrictID,
    name: item.DistrictName,
  }));
  return list;
}

export function formatWardDropdownList(wardList: WardType[]) {
  const list = wardList.map((item: WardType) => ({
    _id: item.WardCode,
    name: item.WardName,
  }));
  return list;
}
