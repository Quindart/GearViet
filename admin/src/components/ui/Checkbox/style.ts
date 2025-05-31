import styled from '@emotion/styled';
import { FormGroup } from '@mui/material';
import theme from 'theme';

const CustomCheckBox = styled(FormGroup)`
  & .MuiFormControlLabel-root {
    margin-left: 0;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  & .MuiCheckbox-root {
    padding: 0;
    font-size: 12px;
    overflow: hidden;
    &.Mui-checked {
      color: ${theme.primary};
      & .MuiTouchRipple-root {
      }
    }

    & .MuiSvgIcon-root {
      font-size: 18px;
    }
  }
  & .MuiTypography-root {
    font-size: 13px;
    font-weight: 500;
    padding-left: 4px;
  }
`;

export default CustomCheckBox;
