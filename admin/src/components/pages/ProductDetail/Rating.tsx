import { Box, Typography } from '@mui/material';
import ReactStars from 'react-stars';
import { ReviewStatsType } from 'types/product';
import { CustomProgress, CustomRating } from './style';
type RatingPropType = {
  avg_review: number;
  reviewStats: ReviewStatsType[];
};
const Rating = (props: RatingPropType) => {
  const { avg_review, reviewStats } = props;

  const total = reviewStats.reduce((acc: number, item: ReviewStatsType) => {
    if (item.count) {
      return acc + item.count;
    }
    return 0;
  }, 0);

  return (
    <CustomRating className='w-full lg:max-w-[340px]'>
      <Typography className='content__title'>Đánh giá & Vote sao</Typography>
      <Box className='flex items-center justify-between px-4 py-2 bg-[#F3F6F9] rounded-md mb-2'>
        <ReactStars count={5} size={18} value={avg_review} color2={'#ffd700'} edit={false} />
        <Typography className='text-[13px] text-[495057]'>
          {avg_review ? avg_review.toFixed(1) : 0} trên 5 sao
        </Typography>
      </Box>
      <Typography className='text-center text-[13px] text-[#878A99]'>
        Tổng{' '}
        <Typography component={'span'} className='text-[13px] font-medium'>
          {total}{' '}
        </Typography>
        đánh giá
      </Typography>
      <Box className='rating__bx w-full'>
        {reviewStats.map((item: ReviewStatsType, index: number) => (
          <Box className='rating__item' key={index}>
            <Typography>{item._id}</Typography>
            <CustomProgress
              variant='determinate'
              value={(item.count / total) * 100}
              // className={item.className}
            />
            <Typography>{item.count}</Typography>
          </Box>
        ))}
      </Box>
    </CustomRating>
  );
};

export default Rating;
