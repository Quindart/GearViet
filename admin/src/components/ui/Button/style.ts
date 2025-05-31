import styled from '@emotion/styled';
import { Button as MuiButton } from '@mui/material';
import theme from 'theme';

const CustomMuiButton = styled(MuiButton)`
  transition: all 0.3s ease;
  box-shadow: ${theme.shadow}; // put new class for other versions of button
  transition: all 0.3s ease-in-out;
  font-size: 13px;
  font-weight: 600;
  box-shadow: none;
  text-transform: capitalize;

  &.btn--auth {
    background-color: ${theme.button_auth_bg};
    opacity: 0.8;
    color: ${theme.white};
    text-transform: capitalize;

    &:hover {
      opacity: 1;
      background-color: ${theme.button_auth_bg};
    }
  }

  svg {
    margin-left: 4px;
  }
  &.MuiButton-contained {
    color: ${theme.white};
    background-color: ${theme.button_primary_contained_bg};

    &.Mui-disabled {
      color: rgba(0, 0, 0, 0.26) !important;
      background-color: rgba(0, 0, 0, 0.12) !important;

    }
    &:hover {
      background-color: ${theme.button_primary_contained_bg_hover};
    }
    &.btn--success {
      background-color: ${theme.button_success_contained_bg};
      &:hover {
        background-color: ${theme.button_success_contained_bg_hover};
      }
    }
    &.btn--warning {
      background-color: ${theme.button_warning_contained_bg};
      &:hover {
        background-color: ${theme.button_warning_contained_bg_hover};
      }
    }
    &.btn--info {
      background-color: ${theme.button_info_contained_bg};
      &:hover {
        background-color: ${theme.button_info_contained_bg_hover};
      }
    }
    &.btn--danger {
      background-color: ${theme.button_danger_contained_bg};
      &:hover {
        background-color: ${theme.button_danger_contained_bg_hover};
      }
    }
  }

  &.MuiButton-outlined {
    border: 1px solid;
    background-color: ${theme.white};
    color: ${theme.button_primary_outlined_text};
    cursor: cursor: not-allowed;
    &.Mui-disabled {
      color: rgba(0, 0, 0, 0.26) !important;
      background-color: rgba(0, 0, 0, 0.12) !important;
    }
    &:hover {
      color: ${theme.white};
      background-color: ${theme.button_primary_outlined_bg_hover};
    }
    &.btn--success {
      color: ${theme.button_success_outlined_text};
      border-color: ${theme.button_success_outlined_border};
      &:hover {
        color: ${theme.white};
        background-color: ${theme.button_success_outlined_bg_hover};
      }
    }

    &.btn--warning {
      color: ${theme.button_warning_outlined_text};
      border-color: ${theme.button_warning_outlined_border};
      &:hover {
        color: ${theme.white};
        background-color: ${theme.button_warning_outlined_bg_hover};
      }
    }
    &.btn--info {
      color: ${theme.button_info_outlined_text};
      border-color: ${theme.button_info_outlined_border};
      &:hover {
        color: ${theme.white};
        background-color: ${theme.button_info_outlined_bg_hover};
      }
    }
    &.btn--danger {
      color: ${theme.button_danger_outlined_text};
      border-color: ${theme.button_danger_outlined_border};
      &:hover {
        color: ${theme.white};
        background-color: ${theme.button_danger_outlined_bg_hover};
      }
    }
  }
`;

export default CustomMuiButton;
