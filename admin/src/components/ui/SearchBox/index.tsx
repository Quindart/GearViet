import { Icon } from '@iconify/react';
import { InputAdornment, TextFieldProps } from '@mui/material';
import TextField from '../TextField';
import './style.css';

const SearchBox = (props: TextFieldProps) => {
  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position='start' className='bg-white'>
            <Icon icon='ic:baseline-search' className='text-[24px]' />
          </InputAdornment>
        ),
      }}
      {...props}
      sx={{
        width: '100%',
        '& .MuiInputBase-root': {
          paddingLeft: '8px !important',
        },
      }}
    />
  );
};

export default SearchBox;
