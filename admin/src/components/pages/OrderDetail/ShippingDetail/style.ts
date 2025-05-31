import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from './../../../../theme/index';

const CustomShippingDetail = styled(Box)`
  width: 100%;
  background: ${theme.white};

  & .header__bx {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px;
    border-bottom: 1px solid ${theme.border_pagination};
  }
  & .header__text {
    font-size: 16px;
    color: ${theme.text_rubric};
    font-weight: 500;
  }

  & .content__text {
    font-size: 13px;
    margin-bottom: 8px;
  }
`;

export default CustomShippingDetail;
