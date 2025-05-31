import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from 'theme';
// import theme from 'theme';

const CustomOrder = styled(Box)`
  background-color: ${theme.white};
  width: 100%;

  & .title {
    width: 100%;
    padding: 25px 16px;
    border-bottom: 1px dashed #e9ebec;
  }

  & .searchBx {
    width: 100%;
    padding: 16px;
    display: flex;
    gap: 16px;
    border-bottom: 1px dashed #e9ebec;
  }

  & label.Mui-focused {
    color: ${theme.primary};
  }

  & .flex_col {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  & .MuiDataGrid-virtualScroller {
    &::-webkit-scrollbar {
      height: 8px !important;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${theme.bg_navbar_scroll};
      border-radius: 10px;
    }
  }
`;

export const CustomModal = styled(Box)`
  width: 100%;

  & .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: rgba(243, 246, 249);

    & .MuiTypography-root {
      font-size: 16.25px;
      font-weight: 600;
      color: ${theme.text_rubric};
    }

    & svg {
      font-size: 20px;
      cursor: pointer;
      transition: all 0.5s ease-in-out;
    }

    & svg:hover {
      color: ${theme.primary};
    }
  }

  & .content__bx {
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 12px;

    & .text-cap .MuiInputBase-input {
      text-transform: capitalize;
    }

    & .MuiFormLabel-root {
      font-size: 13px;
      color: ${theme.text_navbar_item};
    }
  }

  & .btn__bx {
    display: flex;
    justify-content: flex-end;
    gap: 8px;

    & .MuiButton-root {
      font-weight: 500;
    }
  }
`;

export default CustomOrder;
