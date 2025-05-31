import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from 'theme';

const CustomUser = styled(Box)`
  background-color: ${theme.white};
  width: 100%;
  height: 100%;
  margin: 0;

  & .title {
    width: 100%;
    padding: 25px 16px;
    border-bottom: 1px dashed #e9ebec;
  }

  & .iconify--mdi {
    margin: 0.4rem;
  }

  & .modal__bx {
    width: 100% !important;

    & .header {
      width: 100% !important;
    }
  }

  .iconify--mdi {
    margin: 0.4rem;
  }

  .css-o3vjls-MuiInputBase-root-MuiInput-root {
    cursor: pointer;
    border: 1px solid ${theme.border_input};
    padding: 1px 2px 1px 10px;
  }
  & .MuiDataGrid-cell--textLeft[data-field='status'] .MuiDataGrid-cellContent {
    li {
      list-style: none;
    }

    text-align: center;
    background-color: ${theme.bg_auth};
    border-radius: 5px;
    width: 65%;
    padding: 0.2rem 0.3rem;
  }
  & .MuiDataGrid-cellContent[value='Active'] {
    color: ${theme.success};
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

export default CustomUser;
