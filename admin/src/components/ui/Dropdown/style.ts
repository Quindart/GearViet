import styled from '@emotion/styled';
import { Select } from '@mui/material';
import theme from 'theme';

const CustomMuiSelect = styled(Select)`
  transition: all 0.3s ease-in-out;
  font-size: 13px;
  background-color: ${theme.white};
  height: 38px;

  & .MuiSelect-select {
    height: 38px;
    min-width: 100px;
    padding: 0 12px;
    display: flex;
    align-items: center;
  }

  input {
    height: 38px;
    width: 100%;
  }

  //   & .MuiOutlinedInput-notchedOutline {
  //     border-color: ${theme.border_select};
  //     border-width: 1px;
  //   }

  //   &.Mui-focused {
  //     & .MuiOutlinedInput-notchedOutline {
  //       border-color: ${theme.border_select_active};
  //       border-width: 1px;
  //     }
  //   }
  //
`;

export default CustomMuiSelect;
