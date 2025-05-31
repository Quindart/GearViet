import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from 'theme';
const CustomCoupon = styled(Box)`
  background-color: ${theme.white};
  height: 100%;
  width: 100%;

  & .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 16px;
    border-bottom: 1px dashed #e9ebec;
  }

  & .iconify--mdi {
    margin: 0.4rem;
  }

  & .css-o3vjls-MuiInputBase-root-MuiInput-root {
    cursor: pointer;
    border: 1px solid ${theme.border_input};
    padding: 1px 2px 1px 10px;
  }
  li {
    list-style: none;
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

    & .btn__close {
      background-color: ${theme.bg_app};
      color: ${theme.text_rubric};
    }

    & .MuiButton-root {
      font-weight: 500;
    }
  }
`;

export default CustomCoupon;
