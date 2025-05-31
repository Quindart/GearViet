import styled from '@emotion/styled';
import { FormGroup, Box } from '@mui/material';
import theme from 'theme';

const CategoryBox = styled(FormGroup)`
  width: 100%;
  background-color: ${theme.white};

  & .icon {
    font-size: 20px;
    cursor: pointer;
    transition: all easy-in-out 0.5s;
  }
  & .icon:hover {
    opacity: 0.8;
  }

  & .deleteBox {
    font-size: 8px !important;
  }
`;

export const CustomModal = styled(Box)`
  & .MuiFormLabel-root {
    /* font-size: 13px; */
    font-weight: 500;
    margin-bottom: 4px;
  }
`;

export default CategoryBox;
