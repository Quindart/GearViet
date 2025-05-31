import {
  Checkbox as MUICheckBox,
  CheckboxProps,
  FormControlLabel,
  Typography,
} from '@mui/material';
import React, { memo } from 'react';
import CustomCheckBox from './style';

interface CustomCheckBoxPropsType extends CheckboxProps {
  label?: string;
  value?: string;
  checked?: boolean;
  children?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CustomCheckBoxPropsType> = (props: CustomCheckBoxPropsType) => {
  const { label, value, checked, onChange, ...restProps } = props;
  return (
    <CustomCheckBox>
      <FormControlLabel
        control={
          <MUICheckBox
            checked={checked}
            onChange={onChange}
            className='checkbox'
            {...restProps}
            value={value}
          />
        }
        label={
          label ? (
            <Typography
              className='flex items-center gap-2'
              sx={{ fontWeight: checked ? '600' : '500' }}
            >
              {props.children}
              {label}
            </Typography>
          ) : (
            ''
          )
        }
      />
    </CustomCheckBox>
  );
};

// function propsEqual(preProps: CustomCheckBoxPropsType, nextProps: CustomCheckBoxPropsType) {
//   return preProps.checked === nextProps.checked;
// }

export default memo(Checkbox);
