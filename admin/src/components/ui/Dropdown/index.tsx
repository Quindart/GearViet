import { FormHelperText, InputLabel, MenuItem, SelectProps } from '@mui/material';
import React from 'react';
import theme from 'theme';
import CustomMuiDropDown from './style';
interface SelectOption {
  name: string;
  _id: string;
  subcategory?: SelectOption[];
}
interface CustomMuiDropDownPropsType extends Omit<SelectProps, 'ref'> {
  error?: boolean;
  helperText?: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  options: SelectOption[] | undefined;
}

const DropDown: React.FC<CustomMuiDropDownPropsType> = (props: CustomMuiDropDownPropsType) => {
  const { options, placeholder, id, label, required, error, helperText, ...restProps } = props;
  return (
    <>
      {label && (
        <InputLabel
          htmlFor={id}
          className='mb-2 text-sm font-semibold'
          sx={{
            color: theme.text_rubric,
            '& span': {
              color: theme.require,
            },
          }}
        >
          {label} {required && <span>*</span>}
        </InputLabel>
      )}
      <CustomMuiDropDown id={id} displayEmpty {...restProps}>
        {placeholder && (
          <MenuItem value=''>
            <span className='dropdown__label--text text-xs'>{placeholder}</span>
          </MenuItem>
        )}

        {options &&
          options?.map((option: SelectOption) => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
      </CustomMuiDropDown>
      {helperText && (
        <FormHelperText error={error} className='ml-2'>
          {helperText}
        </FormHelperText>
      )}
    </>
  );
};
export default DropDown;
