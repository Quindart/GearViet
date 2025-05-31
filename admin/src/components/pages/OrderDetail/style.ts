import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from 'theme';

const CustomOrderDetail = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  & .card {
    background-color: ${theme.white};
    display: flex;
    flex-direction: column;

    &__titleBx {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid ${theme.border_pagination};
    }
  }
`;

export default CustomOrderDetail;
