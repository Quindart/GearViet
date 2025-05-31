import styled from '@emotion/styled';
import theme from 'theme';

const CustomLoading = styled('section')`
  background-color: ${theme.bg_app};
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;

  & .MuiCircularProgress-root {
    margin: auto;
    color: ${theme.primary};
  }
`;

export default CustomLoading;
