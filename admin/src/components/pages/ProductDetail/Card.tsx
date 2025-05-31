import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';

type CardPropTypes = {
  icon?: string;
  name?: string;
  value?: string;
};

const Card = (props: CardPropTypes) => {
  const { icon, name, value } = props;
  return (
    <Box className='card__item'>
      <Box>
        <Icon icon={icon as string} />
      </Box>
      <Box>
        <Typography className='text-[13px] text-[#878A99]'>{name}</Typography>
        <Typography className='text-[16.25px] text-[#495057] font-medium'>{value}</Typography>
      </Box>
    </Box>
  );
};

export default Card;
