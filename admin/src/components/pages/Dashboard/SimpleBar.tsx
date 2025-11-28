import { Box, Typography } from '@mui/material';
import listActivity from 'temp/ActivityData';
import theme from 'theme';
import ActitvityItem from './ActivityItem';
import { CustomSimplebar } from './style';

type ActivityItemTypes = {
  title: string;
  icon: string;
  color_icon: string;
  bg_icon: string;
  decripstion: string;
  date: string;
};

const SimpleBar = () => {
  return (
    <>
      <CustomSimplebar className='2xl:block no-scrollbar pb-[60px]'>
        <Box className='text-[13px]'>
          <Typography className=' font-[600]' sx={{ color: theme.text_gray }}>
            Hoạt động gần đây
          </Typography>
        </Box>
        {listActivity.map((item: ActivityItemTypes, index: number) => (
          <ActitvityItem activityItem={item} key={index} />
        ))}
      </CustomSimplebar>
    </>
  );
};
export default SimpleBar;
