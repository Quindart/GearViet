import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from './../../../theme/index';

const CustomProfileModal = styled(Box)`
  width: 100%;
  height: auto;

  & .MuiFormLabel-root {
    font-size: 13px;
    color: ${theme.text_rubric};
  }

  & .header {
    position: relative;
    width: 100%;
    height: 140px;

    &__bg {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: ${theme.primary};

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.4;
      }
    }

    &__avatar {
      position: absolute;
      left: 50%;
      bottom: -49px;
      transform: translateX(-50%);
      width: 96px;
      height: 96px;
      border-radius: 50%;
      border: 4px solid ${theme.white};

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }

      & .icon__bx {
        position: absolute;
        bottom: 4px;
        right: -10px;
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: ${theme.bg_app};
        cursor: pointer;
        transition: all 0.5s ease-in-out;

        & svg {
          font-size: 14px;
          color: ${theme.text_rubric};
        }

        &:hover {
          background-color: ${theme.primary};
          & svg {
            color: ${theme.white};
          }
        }
      }
    }
  }

  & .title {
    margin-top: 69px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__name {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 4px;
      color: ${theme.text_rubric};
      text-transform: capitalize;
    }

    &__role {
      font-size: 13px;
      color: ${theme.text_sub_rubric};
    }
  }

  & .content {
    padding: 16px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  & .button__bx {
    padding: 16px;
    display: flex;
    justify-content: space-between;

    & .btn--save {
      background-color: ${theme.success};
    }
  }
`;

export const CustomChangePassword = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;

  & .item__bx {
    position: relative;
    margin-bottom: 12px;
  }

  svg {
    position: absolute;
    right: 12px;
    bottom: 12px;
  }
`;

export default CustomProfileModal;
