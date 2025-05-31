import { Box } from '@mui/material';
import Accordion from 'components/ui/Accordion';
import Checkbox from 'components/ui/Checkbox';
import { DISCOUNT_OPTIONS } from 'utils/app-config';

const Discount = () => {
  return (
    <Box className='filter__bx'>
      <Accordion name='Discount'>
        <Box className='flex flex-col gap-2'>
          {DISCOUNT_OPTIONS.map((item: string, index: number) => (
            <Checkbox label={`${item} or more`} key={index} />
          ))}
        </Box>
      </Accordion>
    </Box>
  );
};

export default Discount;
