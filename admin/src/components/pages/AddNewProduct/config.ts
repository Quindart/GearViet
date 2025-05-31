import { ProductFormDataType } from 'types/product';
import * as yup from 'yup';
import React from 'react';
export interface InfoGroupWrapperPropsType {
  children: React.ReactNode;
  heading?: string;
}
export const initialValues: ProductFormDataType = {
  name: '',
  code: '',
  images: [],
  tags: [],
  price: 0,
  description: '',
  available: 0,
  brand: '',
  category: '',
  subcategory: '',
};

export const validationSchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên sản phẩm.'),
  category: yup.string().required('Vui lòng chọn danh mục sản phẩm'),
  subcategory: yup.string().required('Vui lòng nhập danh mục sản phẩm phụ'),
  description: yup.string().required('Vui lòng nhập miêu tả về sản phẩm.'),
  brand: yup
    .string()
    .typeError('Vui lòng tên thương hiệu')
    .required('Vui lòng chọn tên thương hiệu.'),
  images: yup
    .array()
    .min(1, 'Vui lòng chọn 1 ảnh đại diện cho sản phẩm')
    .required('Vui lòng chọn 1 ảnh đại diện cho sản phẩm'),
  available: yup
    .number()
    .typeError('Vui lòng nhập số')
    .min(1, 'Số lượng tồn kho phải lớn hơn 0 ')
    .positive('Số lượng tồn kho phải lớn hơn 0 ')
    .required('Vui lòng nhập số lượng hàng trong kho'),
  price: yup
    .number()
    .typeError('Vui lòng nhập số')
    .min(1, 'Giá sản phẩm phải lớn hơn 0 ')
    .positive('Giá sản phẩm phải lớn hơn 0 ')
    .required('Vui lòng nhập giá sản phẩm'),
});
