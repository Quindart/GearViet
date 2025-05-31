import { SelectChangeEvent } from '@mui/material';
import React from 'react';
import { CouponFormDataType } from 'types/coupon';

type FormContextValuesType = {
  values: CouponFormDataType;
  touched: any;
  errors: any;
  setFieldValue: (field: string, value: any | never[], shouldValidate?: boolean) => void;
  setFieldError: (field: string, errorMsg: string) => void;
  setTouched: (fields: { [field: string]: boolean }, shouldValidate?: boolean) => void;
  handleChange: (event: React.ChangeEvent<any> | SelectChangeEvent<unknown>) => void;
  handleBlur: (event: React.ChangeEvent<any>) => void;
};
export const formContextValues = {
  values: {} as CouponFormDataType,
  touched: {} as any,
  errors: {} as any,
  setFieldValue: () => {},
  setFieldError: () => {},
  setTouched: () => {},
  handleChange: () => {},
  handleBlur: () => {},
};

const NewCouponContext = React.createContext<FormContextValuesType>(formContextValues);

export default NewCouponContext;
