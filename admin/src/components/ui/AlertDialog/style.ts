import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from '../../../theme/index';

const CustomDeleteAlertDialog = styled(Box)`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
    margin-bottom: 32px;
    width: 100px;
    hright: 100px;
  }

  & .title {
    font-size: 19.5px;
    font-weight: 500;
    color: ${theme.text_rubric};
    margin-bottom: 8px;
  }

  & .message {
    font-size: 15px;
    color: ${theme.text_gray};
    margin-bottom: 24px;
  }

  & .btn__bx {
    display: flex;
    gap: 8px;
  }

  & .btn__close {
    background-color: ${theme.bg_app};
    color: ${theme.black};
    font-weight: normal;

    &:hover {
      background-color: #cfd1d4;
      box-shadow: none;
    }
  }

  & .btn__delete {
    font-size: 13px;
    font-weight: normal;

    &:hover {
      box-shadow: none;
    }
  }
`;

export default CustomDeleteAlertDialog;
