import { Box, InputLabel, TextFieldProps } from '@mui/material';
import React from 'react';
import theme from 'theme';
import CustomMuiTextField from './style';

const TextField: React.FC<TextFieldProps> = (props: TextFieldProps) => {
  const { required, label, id, ...restProps } = props;
  return (
    <Box component='aside' sx={{ width: '100%' }}>
      {label && (
        <InputLabel
          htmlFor={id}
          className='mb-2 text-[13px] font-medium'
          sx={{
            color: theme.text_rubric,
            '& span': {
              color: theme.require,
            },
          }}
        >
          {label} {required && <span>*</span>}
        </InputLabel>
      )}
      <CustomMuiTextField id={id} {...restProps} />
    </Box>
  );
};
export default React.memo(TextField);
