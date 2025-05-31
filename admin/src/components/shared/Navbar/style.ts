import styled from '@emotion/styled';
import { AppBar, Box } from '@mui/material';
import theme from 'theme';
const navbarHeight = '70px';

const AppbarCustom = styled(AppBar)`
  height: ${navbarHeight};
  padding: 0 24px 0 12px;
  display: flex;
  justify-content: center;
  align-items: space-between;
  background-color: ${theme.bg_navbar};
  color: ${theme.black};
  box-shadow: none;
  z-index: 1000;

  & .toolbar {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .icon__bx,
  & .avatar__bx {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    & .nav_bar_item {
      font-size: 22px;
      color: ${theme.icon};
      :hover {
        background-color: ${theme.icon_bg_hover};
        color: ${theme.icon_hover};
      }
      &.active {
        background-color: ${theme.icon_bg_hover};
        color: ${theme.icon_hover};
      }
    }
    img {
      border-radius: 100%;
      width: 32px;
      height: 32px;
      object-fit: cover;
    }

    & .MuiTypography-root {
      font-size: 14px;
    }

    & .MuiBadge-badge {
      background-color: ${theme.notification_bg_color};
      color: ${theme.white};
    }
  }

  & .avatar__bx {
    color: ${theme.text_sub_rubric};
  }

  & .avatar__name {
    color: ${theme.text_heading};
    font-size: 13px !important;
    font-weight: 500;
  }
`;

export const DropDownContainer = styled(Box)`
  position: absolute;
  right: 0;
  top: calc(100% + 16px);
  width: 320px;
  max-width: 320px;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 5px 10px rgba(30, 32, 37, 0.12);
  background: ${theme.white};
  animation: fadeInUp 0.3s ease-in-out;

  svg {
    width: 20px;
    height: 20px;
  }
  & .notify__header {
    width: 100%;
    padding: 16px;
    background-color: ${theme.primary};
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;

    &__text {
      font-size: 16px !important;
      font-weight: 600;
      color: ${theme.white};
    }
  }

  & .notify__body {
    max-height: 330px;
    overflow-y: auto;
    padding: 0 8px;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${theme.bg_navbar_scroll};
      border-radius: 10px;
    }

    &__item {
      width: 100%;
      display: flex;
      align-items: flex-start;
      padding: 12px 16px;
      transition: all 0.3s ease-in-out;

      & .MuiListItemIcon-root {
        min-width: auto;
      }

      & .MuiListItemText-root {
        margin: 0;
      }

      & .link {
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 4px;
        color: ${theme.text_rubric};
      }

      & .text {
        font-weight: 400;
        color: ${theme.text_gray};
      }

      & .time {
        font-size: 11px;
        font-weight: 500;
        color: ${theme.text_gray};
        text-transform: uppercase;
      }

      &:first-child {
        margin-top: 8px;
      }

      &:hover {
        background-color: ${theme.bg_navbar_hover};
      }
      & p {
        font-size: 13px;
      }
    }
    & .MuiButton-root {
      background-color: rgba(10, 179, 156, 0.1) !important;
      color: ${theme.button_success_contained_bg};
      font-size: 13px;
      font-weight: 400;

      & svg {
        width: 13px;
        height: 13px;
      }

      &:hover {
        background-color: ${theme.success} !important;
        box-shadow: none;
        color: ${theme.white};
      }
    }
  }
`;

export const ProfileBox = styled(Box)`
  padding: 8px 0;
  position: absolute;
  right: 0;
  top: 95%;
  width: 180px;
  height: auto;
  background: ${theme.white};
  border-radius: 4px;
  box-shadow: 0 5px 10px rgba(30, 32, 37, 0.12);
  animation: fadeInUp 0.3s ease-in-out;

  & .profile {
    &__title {
      padding: 8px 19.2px;
      font-size: 11.375px !important;
      font-weight: 500;
      color: ${theme.text_navbar_heading} !important;
    }

    &__item {
      & .MuiListItemIcon-root {
        min-width: unset;
      }

      padding: 5.6px 19.2px;
      color: ${theme.text_navbar_item};
      svg {
        width: 16px;
        height: 24px;
        margin-right: 8px;
        color: ${theme.text_sub_rubric};
      }
      span {
        font-size: 13px !important;
      }
    }
  }
`;

export default AppbarCustom;
