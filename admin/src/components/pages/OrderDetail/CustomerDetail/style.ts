import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from 'theme';

const CustomCustomerDetail = styled(Box)`
  width: 100%;
  background: ${theme.white};
  display: flex;
  flex-direction: column;

  & .header__bx {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 16px;
    border-bottom: 1px solid ${theme.border_pagination};
  }

  & .header__title {
    font-size: 16px;
    color: ${theme.text_rubric};
    font-weight: 500;
  }
`;

export default CustomCustomerDetail;
