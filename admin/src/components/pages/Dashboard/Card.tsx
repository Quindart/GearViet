import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
import theme from 'theme';
import { CustomCard } from './style';
type CardItemTypes = {
  title: string;
  value: string;
  percentValue: string;
  link_view: string;
  icon: string;
  color_icon: string;
  bgcolor_icon: string;
};
type CardItemPropsTypes = {
  cardItem: CardItemTypes;
};
const Card = (props: CardItemPropsTypes) => {
  const { cardItem } = props;
  return (
    <>
      <CustomCard>
        <Box className='card--root w-full xl:w-full' sx={{ background: theme.white }}>
          <Box className='flex justify-between'>
            <Typography>{cardItem.title}</Typography>
            <Typography className='font-[500]' sx={{ color: theme.button_auth_bg }}>
              {cardItem.percentValue}
            </Typography>
          </Box>
          {/* {cardItem.value}  {cardItem.link_view} */}
          <Box className='flex items-end justify-between mt-[24px]'>
            <Box className='leading-[50px]'>
              <Typography className='text-[22px] text-[#495057] mb-[10px] font-[500]'>
                {cardItem.value}
              </Typography>
              <Typography className='text-[13px] underline' sx={{ color: theme.bg_side_bar }}>
                {cardItem.link_view}{' '}
              </Typography>
            </Box>
            <Box
              className='box--icon'
              style={{
                background: cardItem.bgcolor_icon,
                color: cardItem.color_icon,
                borderRadius: '4px',
              }}
            >
              <Icon icon={cardItem.icon} />
            </Box>
          </Box>
        </Box>
      </CustomCard>
    </>
  );
};
export default Card;
