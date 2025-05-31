import { Icon } from '@iconify/react';
import { Box, Divider, Typography } from '@mui/material';
import { CustomReview } from './style';
import { ReviewType } from '../../../types/product';
import Moment from 'moment';

type ReviewPropType = {
  reviews: ReviewType[];
};
const Review = (props: ReviewPropType) => {
  const { reviews } = props;

  return (
    <CustomReview className='w-full'>
      <Typography className='content__title'>Reviews:</Typography>
      <Box className='review__bx'>
        {reviews.map((item: ReviewType, index: number) => (
          <Box className='review__item' key={index}>
            <Box className='flex items-center gap-4'>
              <Box
                className={`star__bx ${
                  item.score > 3
                    ? 'bg-[#0ab39c]'
                    : item.score === 3
                    ? 'bg-[#f7b84b]'
                    : 'bg-[#f06548]'
                }`}
              >
                <Icon icon='mdi:star' className='text-[10px] text-white' />
                <Typography className='text-[10px] font-bold text-white'>{item.score}</Typography>
              </Box>
              <Divider orientation='vertical' flexItem />
              <Typography className='text-[13px] text-[#878A99]'>{item.content}</Typography>
            </Box>
            {/* <Box className='image__bx'>
              {item.images &&
                item.images.map((image: any, index: number) => (
                  <img key={index} src={image.url} alt={image.url} />
                ))}
            </Box> */}
            <Box className='flex justify-between'>
              <Typography className='text-[14px] text-[#495057] font-medium'>
                {item.name}
              </Typography>
              <Typography className='text-[13px] text-[#878A99]'>
                {Moment(item.createdAt).format('HH:mm:ss YYYY-MM-DD')}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </CustomReview>
  );
};

export default Review;
