import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Accordion from 'components/ui/Accordion';
import { RATING_OPTIONS } from 'utils/app-config';

type RatingPropsType = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  activeItem: number;
};

const Rating = (props: RatingPropsType) => {
  const { onChange, activeItem } = props;
  return (
    <Box className='filter__bx'>
      <Accordion name='Rating'>
        <Box className='flex flex-col gap-2'>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='female'
            name='radio-buttons-group'
            onChange={onChange}
          >
            {RATING_OPTIONS.map((item: number, index: number) => (
              <FormControlLabel
                value={item}
                control={<Radio size='small' />}
                label={`${item} star`}
                key={index}
                checked={activeItem === item}
              />
            ))}
          </RadioGroup>
        </Box>
      </Accordion>
    </Box>
  );
};

export default Rating;
