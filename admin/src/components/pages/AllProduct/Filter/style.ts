import { Box } from '@mui/material';
import styled from '@emotion/styled';
import theme from './../../../../theme/index';

const CustomFilter = styled(Box)`
  width: 100%;

  & .header {
    padding: 16px;
    border-bottom: 1px solid #e9ebec;
  }

  & .filter__bx {
    border-top: 1px solid ${theme.border};

    & .MuiInputBase-root {
      background-color: rgba(243, 246, 249);
      height: 36px;
      font-size: 13px;
      padding-left: 13px;

      & .MuiInputBase-input {
        background-color: rgba(243, 246, 249);
      }
      & svg {
        background-color: rgba(243, 246, 249);
      }
    }

    & .MuiPaper-root {
      border-radius: 0 !important;
    }

    & .MuiAccordionSummary-root {
      & .MuiTypography-root {
        font-size: 13px !important;
        font-weight: 500 !important;
        color: ${theme.text_sub_rubric} !important;
      }
    }

    & .MuiAccordionDetails-root {
      border-radius: none;
    }

    & .MuiTypography-root {
      font-size: 13px;
      font-weight: 500;
    }
  }
`;

export default CustomFilter;
