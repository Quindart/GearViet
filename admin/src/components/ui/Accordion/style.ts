import styled from '@emotion/styled';
import { Accordion } from '@mui/material';
import theme from 'theme';

const CustomAccordion = styled(Accordion)`
  margin: 0;
  &.MuiAccordion-root {
    margin: 0;
    padding: 0 20px;

    & .MuiAccordionSummary-root {
      position: relative;
      min-height: 0;
      padding: 0;
      height: 40px;

      & .MuiAccordionSummary-content {
        & .MuiTypography-root {
          font-size: 13px;
          color: ${theme.text_rubric};
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        margin: 0;
      }
    }

    & .MuiAccordionDetails-root {
      margin: 16px 0;
      color: ${theme.text_black};
    }
  }
  & .icon {
    margin: 0 8px;
  }
  & .MuiAccordionSummary-content > span {
    background-color: #0ab39c;
  }

  & .MuiAccordionSummary-root.Mui-expanded {
    height: 40px;
  }
`;

export default CustomAccordion;
