import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from 'theme';

const CustomCalendar = styled(Box)`
  & .MuiInputBase-root {
    height: 38px;
    width: 100%;
    font-size: 13px;
  }

  & .MuiTypography-root {
    font-size: 13px;
    color: ${theme.text_table_cell};
  }

  & .MuiFormControl-root {
    width: 100%;
  }

  .MuiFormHelperText-root {
    color: ${theme.error};
  }
`;
export default CustomCalendar;
