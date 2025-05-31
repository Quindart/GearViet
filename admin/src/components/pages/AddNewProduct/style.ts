import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from 'theme';

const CustomInfoGroupWrapper = styled(Box)`
  & .file__bx {
    width: 100%;
    height: 230px;
  }

  & .upload-file {
    margin: auto;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background-color: ${theme.white};
    display: flex;
    color: ${theme.text_gray};
    justify-content: center;
    align-items: center;
    position: relative;

    &__icon {
      position: absolute;
      right: -10px;
      top: -10px;
      z-index: 0;
      color: ${theme.text_gray};
      width: 32px;
      height: 32px;
      padding: 8px;
      border-radius: 50%;
      background-color: ${theme.bg_app};
      border: 1px solid ${theme.border};
    }
    & input[type='file'] {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }

  & .heading {
    font-size: 16px;
    padding: 16px;
    font-weight: 600;
    border-bottom: 1px solid ${theme.border};
  }

  & .tag_box {
    position: relative;
    cursor: text;
    padding-right: 0.9rem;
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    background-color: #fff;
    padding: 0.25rem 0.5rem 0.25rem 0.5rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem !important;
    font-size: 0.8125rem;
    align-items: center;
  }

  & .tag_input {
    display: inline-block;
    vertical-align: baseline;
    background-color: #fff;
    color: rgb(33, 37, 41);
    font-size: 0.8125rem;
    margin-bottom: 0;
    border: 0;
    border-radius: 0;
    min-width: 1ch;
    max-width: 100%;
    padding: 2px 0 2px 2px;
  }

  & .tag_input {
    outline: none;
  }

  & .tag_tooltip {
    position: absolute;
    width: 100%;
    top: 100%;
    left: -0.18rem;
    z-index: 1000;
    overflow: visible;
    visibility: visible;
    background-color: #fff;
    border: 1px solid #e9ebec;
    color: black;
  }

  & .tag_tooltip-text {
    position: relative;
    font-size: 0.8125rem;
    padding: 0.35rem 1.2rem 0.35rem 16px;
    cursor: default;
  }

  & .tag_tooltip-text-error {
    color: red;
  }
`;

export default CustomInfoGroupWrapper;
