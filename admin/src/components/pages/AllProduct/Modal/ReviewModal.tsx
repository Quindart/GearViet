import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
import { CustomModal } from '../style';
import ReactStars from 'react-stars';
import { useEffect, useState } from 'react';
import { ReviewType } from 'types/product';
import { fetchReviewByProductId } from 'services/reviewApi';
import { ResponseType } from 'types';
import avatar from '../../../../assets/images/avatar.jpg';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

type ReviewModalTypes = {
  onClose: () => void;
  id: string;
};

const ReviewModal = (props: ReviewModalTypes) => {
  const { onClose, id } = props;
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchReviewByProductId(id).then((res: ResponseType) => {
      if (res.success && res.reviews) {
        setReviews(res.reviews);
      } else {
        enqueueSnackbar('Vui lòng thử lại sau', { variant: 'error' });
        onClose();
      }
    });
  }, [id]);

  const moveToUserDetailPage = (userId: string) => {
    navigate('/users/' + userId);
  };
  return (
    <CustomModal>
      <Box className='header'>
        <Typography>Review</Typography>
        <Icon icon='ph:x-duotone' onClick={onClose} />
      </Box>
      <Box className='content__bx'>
        {reviews.length > 0 ? (
          reviews.map((review: any) => (
            <Box className='content__item' key={review._id}>
              <Box className='review__content__bx'>
                <img
                  src={review.user.avatar ? review.user.avatar : avatar}
                  onClick={() => moveToUserDetailPage(review.user)}
                  title='Click to see user detail'
                  alt='user avatar'
                />
                <Box>
                  <Typography>{review.content}</Typography>
                  <ReactStars
                    count={5}
                    size={16}
                    value={review.score}
                    color2={'#ffd700'}
                    edit={false}
                  />
                </Box>
              </Box>

              <Box className='review__author__bx'>
                <Typography>{dayjs(review.createdAt).format(' DD , MMM/YYYY')}</Typography>

                <Typography
                  title='Click to see user detail'
                  onClick={() => moveToUserDetailPage(review.user)}
                >
                  By {review.name}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Box className='content__empty'>
            <h1 className=''>Không có đánh giá nào </h1>
          </Box>
        )}
      </Box>
    </CustomModal>
  );
};

export default ReviewModal;
