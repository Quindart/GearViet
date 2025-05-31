import { FormHelperText, InputLabel } from '@mui/material';
import theme from 'theme';
import JoditEditor, { IJoditEditorProps } from 'jodit-react';
import { config } from './config';
import { memo } from 'react';

interface RickTextEditorPropsType extends IJoditEditorProps {
  placeholder?: string;
  id: string;
  name?: string;
  label: string;
  error?: boolean;
  helperText?: string | undefined | boolean;
}
const RickTextEditor = (props: RickTextEditorPropsType) => {
  const { label, id, helperText, error, placeholder, ...rest } = props;
  return (
    <>
      {label && (
        <InputLabel
          htmlFor={id}
          className='mb-2 text-sm font-semibold'
          sx={{
            color: theme.text_rubric,
            '& span': {
              color: theme.require,
            },
          }}
        >
          {label}
        </InputLabel>
      )}
      <JoditEditor
        {...rest}
        config={{ ...config, placeholder: placeholder || 'Nhập mô tả sản phẩm' }}
      />
      <FormHelperText error={error} className='text-xs my-2 ml-1'>
        {helperText}
      </FormHelperText>
    </>
  );
};

export default memo(RickTextEditor);
