import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
import theme from 'theme';
type ActivityItemTypes = {
  title: string;
  icon: string;
  color_icon: string;
  bg_icon: string;
  decripstion: string;
  date: string;
};
type ActivityItemPropsTypes = {
  activityItem: ActivityItemTypes;
};
const ActitvityItem = (props: ActivityItemPropsTypes) => {
  const { activityItem } = props;
  return (
    <Box className='flex gap-4 my-5'>
      <Box>
        <Box
          className='rounded-full w-[32px] h-[32px] flex items-center justify-center'
          style={{ color: `${activityItem.color_icon}`, background: `${activityItem.bg_icon}` }}
        >
          <Icon icon={activityItem.icon} />
        </Box>
      </Box>
      <Box className='text-[13px]' sx={{ color: theme.text_gray }}>
        <Typography className='font-[500] text-black'>{activityItem.title}</Typography>
        <Typography className='mt-[6px]'>{activityItem.decripstion}</Typography>
        <Typography className='mt-[10px] text-[12px]'>{activityItem.date}</Typography>
      </Box>
    </Box>
  );
};
export default ActitvityItem;
