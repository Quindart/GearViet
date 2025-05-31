import { Box, Typography, SelectChangeEvent } from '@mui/material';
// import Button from 'components/ui/Button';
import DropDown from 'components/ui/Dropdown';
import useOrder from 'hooks/useOrder';
import useProduct from 'hooks/useProduct';
import { useEffect, useState } from 'react';
// import listCard from 'temp/CardData';
import theme from 'theme';
import { IOrder } from 'types/order';
import { ProductDataType } from 'types/product';
import { DASHBOARD_TIME_OPTIONS } from 'utils/constants';
import BestSellingTable from './BestSellingTable';
import Card from './Card';
import NewProductTable from './NewProductTable';
import RecentOrderTable from './RecentOrderTable';
import SimpleBar from './SimpleBar';
import CustomDashBoard from './style';
import useUser from 'hooks/useUser';

const DashboardTemplate = () => {
  const [currentTime, setCurrentTime] = useState<string>('days');
  const {
    getBestSellingProduct,
    bestSellingProduct,
    newestProduct,
    getNewestProduct,
    totalProductByTime,
    getTotalProductByTime,
  } = useProduct();
  const {
    getRecentOrder,
    recentOrder,
    totalOrderByTime,
    getTotalOrderByTime,
    totalRevenueByTime,
    getTotalRevenueByTime,
  } = useOrder();
  const { totalUserByTime, getTotalUserByTime } = useUser();

  const listCard = [
    {
      title: 'TOTAL EARNINGS',
      value: '$' + totalRevenueByTime,
      percentValue: '+16.24 %',
      link_view: 'See details',
      icon: 'ph:currency-circle-dollar-bold',
      color_icon: ' #0ab39c',
      bgcolor_icon: 'rgba(10,179,156,.18)',
    },
    {
      title: 'ORDERS',
      value: totalOrderByTime,
      percentValue: '-3.57 %',
      link_view: 'See details',
      icon: 'bx:shopping-bag',
      color_icon: '#299cdb',
      bgcolor_icon: 'rgba(41,156,219,.18)',
    },
    {
      title: 'USERS',
      value: totalUserByTime,
      percentValue: ' +29.08 %',
      link_view: 'See details',
      icon: 'ph:user-circle-bold',
      color_icon: '#f7b84b',
      bgcolor_icon: 'rgba(247,184,75,.18)',
    },
    {
      title: 'NEW PRODUCT',
      value: totalProductByTime,
      percentValue: '+0.00 %',
      link_view: 'See details',
      icon: 'teenyicons:wallet-outline',
      color_icon: '#405189',
      bgcolor_icon: 'rgba(64,81,137,.18)',
    },
  ];

  console.log(currentTime);

  useEffect(() => {
    getBestSellingProduct();
    getNewestProduct();
    getRecentOrder();
  }, []);

  useEffect(() => {
    getTotalProductByTime(currentTime);
    getTotalOrderByTime(currentTime);
    getTotalRevenueByTime(currentTime);
    getTotalUserByTime(currentTime);
  }, [currentTime]);
  return (
    <>
      <CustomDashBoard>
        <Box className='w-full 2xl:w-[calc(100%-280px)]'>
          <Box className='dashboard__title xl:flex-row'>
            <Typography>
              <Typography
                variant='h5'
                component='h5'
                className='text-[16px] font-medium text-[#495057]'
              >
                Good Morning, Anna!
              </Typography>
              <Typography sx={{ color: theme.text_gray }}>
                Here's what's happening with your store today.
              </Typography>
            </Typography>

            <DropDown
              options={DASHBOARD_TIME_OPTIONS}
              name='delivery'
              className=''
              value={currentTime}
              onChange={(e: SelectChangeEvent<unknown>) => setCurrentTime(e.target.value as string)}
            />
          </Box>
          <Box className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
            {listCard.map((item: any, index: number) => (
              <Card key={index} cardItem={item} />
            ))}
          </Box>
          <Box className='flex flex-col 2xl:flex-row gap-6 my-[24px]'>
            <Box className='w-full rounded-md' sx={{ background: theme.white }}>
              <Box className='table__header'>
                <Typography variant='h4' className='text-[#495057] font-[500]' component='h2'>
                  Best Selling Products
                </Typography>
              </Box>
              <BestSellingTable products={bestSellingProduct as ProductDataType[]} />
            </Box>
            <Box className='w-full  rounded-md' sx={{ background: theme.white }}>
              <Box className='table__header'>
                <Typography variant='h4' className='text-[#495057] font-[500]' component='h2'>
                  Newest Product
                </Typography>
              </Box>
              <NewProductTable products={newestProduct as ProductDataType[]} />
            </Box>
          </Box>
          <Box className='rounded-md' sx={{ background: theme.white }}>
            <Box className='table__header'>
              <Typography variant='h4' className='text-[#495057] font-[500]' component='h2'>
                Recent Orders
              </Typography>
            </Box>
            <RecentOrderTable orders={recentOrder as IOrder[]} />
          </Box>
        </Box>
        <SimpleBar />
      </CustomDashBoard>
    </>
  );
};

export default DashboardTemplate;
