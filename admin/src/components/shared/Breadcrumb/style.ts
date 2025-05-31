import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from 'theme';

const BreadcrumCustom = styled(Box)`
  height: 40px;
  top: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  padding: 0 24px;
  background-color: ${theme.white};
  z-index: 100;

  & .title {
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
    color: ${theme.text_rubric};
  }

  & .item {
    font-size: 13px;
    text-transform: capitalize;
    color: ${theme.text_sub_rubric};
  }
`;

export default BreadcrumCustom;
