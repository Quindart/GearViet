import { Box, Typography } from '@mui/material';
import { CustomContent } from './style';
import { ProductDataType } from 'types/product';
import dayjs from 'dayjs';
type MainContentPropType = {
  product: ProductDataType;
};
export default function MainContent(props: MainContentPropType) {
  const { description, brand, available, createdAt, subcategory, rating, code, status } =
    props.product;

  return (
    <CustomContent>
      <Typography className='content__title'>Description:</Typography>
      <p
        className='text-[13px] text-[#878A99] mb-12'
        // hien thi content tu HTML string
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <Typography className='content__title'>Product Description:</Typography>
      <Box className='content__bx'>
        <Box className='content__item'>
          <Typography>Product Code</Typography>
          <Typography>{code?.toUpperCase()}</Typography>
        </Box>
        <Box className='content__item'>
          <Typography>Subcategory</Typography>
          <Typography>{subcategory && subcategory.name}</Typography>
        </Box>
        <Box className='content__item'>
          <Typography>Brand</Typography>
          <Typography>{brand}</Typography>
        </Box>
        <Box className='content__item'>
          <Typography>Available</Typography>
          <Typography>{available}</Typography>
        </Box>
        <Box className='content__item'>
          <Typography>DateCreated</Typography>
          <Typography>{dayjs(createdAt).format('DD , MMM YYYY')}</Typography>
        </Box>
        <Box className='content__item'>
          <Typography>Rating</Typography>
          <Typography>{rating}</Typography>
        </Box>

        <Box className='content__item'>
          <Typography>Status</Typography>
          <Box
            className={`px-[8px] py-[1px] rounded-xl ${
              status === 'active' ? 'bg-[#0ab39c]' : 'bg-[#f06548]'
            }`}
          >
            <Typography className='w-auto text-white font-normal'>{status}</Typography>
          </Box>
        </Box>
      </Box>
    </CustomContent>
  );
}
