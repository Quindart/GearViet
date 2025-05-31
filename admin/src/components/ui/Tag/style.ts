import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from 'theme';

const CustomTag = styled(Box)`
  width: auto;
  display: inline-block;
  color: ${theme.white};
  background-color: ${theme.primary};
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px 3px 7px;
  margin-right: 4px;
  border-radius: 7px;

  & span {
    margin-left: 5px;
    opacity: 0.8;
    cursor: pointer;
    font-size: 11px;

    & svg {
      width: 14px;
      height: 14px;
      display: inline;
    }
  }

  & span:before {
    content: '|';
    margin-right: 5px;
  }

  & span:hover {
    opacity: 1;
  }
`;

export default CustomTag;
