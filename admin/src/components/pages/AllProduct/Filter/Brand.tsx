import { Icon } from '@iconify/react';
import { Box, InputAdornment } from '@mui/material';
import Accordion from 'components/ui/Accordion';
import Checkbox from 'components/ui/Checkbox';
import TextField from 'components/ui/TextField';
import useApp from 'hooks/useApp';

type BrandPropsType = {
  onItemClick: (brand: string) => void;
  brandCheckedList: string[];
};

const Brand = (props: BrandPropsType) => {
  const { brands } = useApp();
  const { onItemClick, brandCheckedList } = props;

  return (
    <Box className='filter__bx'>
      <Accordion name='Brand'>
        <TextField
          placeholder='Search Brands'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Icon icon='ic:baseline-search' className='text-[24px]' />
              </InputAdornment>
            ),
          }}
          className='mb-4'
        />
        <Box className='flex flex-col gap-2'>
          {brands.map((item: string, index: number) => (
            <Checkbox
              label={item}
              value={item}
              checked={brandCheckedList.includes(item)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onItemClick(e.target.value)}
              key={index}
            />
          ))}
        </Box>
      </Accordion>
    </Box>
  );
};

export default Brand;
