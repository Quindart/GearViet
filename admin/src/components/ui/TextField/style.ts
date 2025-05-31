import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import theme from 'theme';

const CustomMuiTextField = styled(TextField)`
  font-size: 13px;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;

  & .MuiFormLabel-root {
    color: ${theme.text_label};
    font-size: 16px;
    margin: 0;

    &.Mui-focused {
      font-size: 20px;
      &:focus {
        background-color: ${theme.white};
      }
    }
  }

  &.Mui-error {
    & .MuiFormLabel-root {
      color: ${theme.error};
    }
  }
  & .MuiInputAdornment-root {
    background-color: transparent;
    width: 100%;
    textarea {
      height: 100%;
    }
    min-height: 20px;
    min-width: 20px;
    background-color: transparent;
  }
  &.MuiInputBase-root {
    background-color: white;
    &:hover {
      background-color: ${theme.white};
    }
    &:focus {
      background-color: ${theme.white};
    }
    &:focus-within {
      background-color: ${theme.white};
    }
    &::before {
      display: none;
    }
    &::after {
      display: none;
    }
  }
  & input {
    box-sizing: border-box;
    height: 38px;
    padding: 10px;
    flex: 1;
    background-color: white;
    font-size: 13px;
    &::placeholder {
      font-size: 13px;
    }
  }
  & .MuiInputAdornment-root {
    width: 20px;
    cursor: pointer;
  }

  &.MuiInputBase-inputMultiline {
    textarea {
      height: 100%;
    }
  }

  & .MuiFormHelperText-root {
    margin: 4px 8px 0;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: ${theme.border_input};
  }

  .MuiOutlinedInput-root:hover {
    .MuiOutlinedInput-notchedOutline {
      color: ${theme.error};
      border-color: ${theme.border_input};
      border-width: 1px;
    }

    &.Mui-error {
      .MuiOutlinedInput-notchedOutline {
        border-width: 0.5px;
        border-color: ${theme.error};
      }
    }
  }
  .MuiOutlinedInput-root:focus-within {
    .MuiOutlinedInput-notchedOutline {
      color: ${theme.error};
      border-color: ${theme.border_input};
      border-width: 1px;
    }
    &.Mui-error {
      .MuiOutlinedInput-notchedOutline {
        border-width: 0.5px;
        border-color: ${theme.error};
      }
    }
  }

  // Remove the up and down arrow of number input
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export default CustomMuiTextField;
