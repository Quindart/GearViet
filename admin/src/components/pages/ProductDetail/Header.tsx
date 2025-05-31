import { Box, Divider, Typography } from '@mui/material';
import { CustomHeader } from './style';
import { ProductDetailData } from 'temp/ProductDetailData';
import ReactStars from 'react-stars';
import Card from './Card';
import { ProductDataType } from 'types/product';
import dayjs from 'dayjs';
type HeaderPropType = {
  product: ProductDataType;
  totalRevenue: number;
};
export default function Header(props: HeaderPropType) {
  const { name, brand, createdAt, price, available, selling } = props.product;

  const cardData = [
    {
      id: 1,
      icon: 'ri:money-dollar-circle-fill',
      name: 'Price',
      value: '$' + price,
    },
    {
      id: 2,
      icon: 'ri:file-copy-2-fill',
      name: 'No. of Orders :',
      value: selling,
    },
    {
      id: 3,
      icon: 'ri:stack-fill',
      name: 'Available Stocks :',
      value: available,
    },
    {
      id: 4,
      icon: 'ri:inbox-archive-fill',
      name: 'Total Revenue :',
      value: '$' + props.totalRevenue,
    },
  ];
  return (
    <CustomHeader className='xl:mt-4'>
      <Typography className='header__title '>{name}</Typography>
      <Box className='flex gap-4 mb-[17px]'>
        <Typography className='header__text text-[#405189]'>{brand}</Typography>
        <Divider orientation='vertical' flexItem />
        <Typography className='header__text text-[#212529] font-medium'>
          <Typography component={'span'} className='header__text text-[#878A99]'>
            Published:
          </Typography>
          {dayjs(createdAt).format(' DD , MMM YYYY')}
        </Typography>
      </Box>
      <ReactStars
        count={5}
        size={18}
        value={ProductDetailData.rating}
        color2={'#ffd700'}
        edit={false}
      />

      <Box className='card__bx md:grid-cols-2 2xl:grid-cols-4'>
        {cardData.map((item: any, index: number) => (
          <Card key={index} name={item.name} icon={item.icon} value={item.value} />
        ))}
      </Box>
    </CustomHeader>
  );
}
