import { ButtonProps } from '@mui/material';
import React from 'react';
import CustomMuiButton from './style';
interface CustomMuiButtonPropsType extends ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<CustomMuiButtonPropsType> = (props: CustomMuiButtonPropsType) => {
  const { children, className, ...rest } = props;
  return (
    <CustomMuiButton {...rest} className={className}>
      {children}
    </CustomMuiButton>
  );
};
export default Button;
