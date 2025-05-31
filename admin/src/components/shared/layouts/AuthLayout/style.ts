import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from 'theme';
import bg_img from '../../../../assets/images/auth-bg.jpg';

const AuthLayoutCustom = styled(Box)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${theme.bg_auth};
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .container {
    width: 90%;
    max-width: 450px;
    background-color: ${theme.white};
    border-radius: 4px;
    overflow: hidden;
    box-shadow: ${theme.shadow};
    padding: 24px;
  }

  & .box__bg {
    width: 100%;
    height: 380px;
    position: absolute;
    top: 0;
    background-image: url(${bg_img});
    background-position: center;
    background-size: cover;
    z-index: 1;
  }

  & .fields {
    text-align: left;
    margin-bottom: 16px;

    &__label {
      margin-bottom: 8px;
      color: ${theme.text_rubric};
      font-size: 14px;
      font-weight: 600;
      & span {
        color: ${theme.require};
      }
    }
  }

  .link {
    color: ${theme.primary};
  }
`;

export default AuthLayoutCustom;
