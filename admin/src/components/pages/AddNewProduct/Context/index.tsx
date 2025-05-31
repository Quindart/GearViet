// interface InfoPropsType {
//   values: ProductFormDataType;
//   touched: FormikTouched<ProductFormDataType>;
//   errors: FormikErrors<ProductFormDataType>;

import { SelectChangeEvent } from '@mui/material';
import React from 'react';
import { ProductFormDataType } from 'types/product';

type FormContextValuesType = {
  values: ProductFormDataType;
  touched: any;
  errors: any;
  setFieldValue: (field: string, value: any | never[], shouldValidate?: boolean) => void;
  setFieldError: (field: string, errorMsg: string) => void;
  setTouched: (fields: { [field: string]: boolean }, shouldValidate?: boolean) => void;
  handleChange: (event: React.ChangeEvent<any> | SelectChangeEvent<unknown>) => void;
  handleBlur: (event: React.ChangeEvent<any>) => void;
};
export const formContextValues = {
  values: {} as ProductFormDataType,
  touched: {} as any,
  errors: {} as any,
  setFieldValue: () => {},
  setFieldError: () => {},
  setTouched: () => {},
  handleChange: () => {},
  handleBlur: () => {},
};
const NewProductContext = React.createContext<FormContextValuesType>(formContextValues);

export default NewProductContext;
