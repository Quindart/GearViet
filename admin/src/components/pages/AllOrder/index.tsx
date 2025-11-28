import { Icon } from '@iconify/react';
import { Box, SelectChangeEvent, Typography } from '@mui/material';
import Button from 'components/ui/Button';
import DropDown from 'components/ui/Dropdown';
import SearchBox from 'components/ui/SearchBox';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LIST_PAYMENT_TYPE, ORDER_SEARCH_OPTIONS } from 'utils/constants';
import OrderTable from './OrderTable';
import CustomOrder from './style';
// import { searchingOrder } from 'services/orderApi';
import useOrder from 'hooks/useOrder';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { KeywordSearchEnum, OrderStatusEnum, PaymentStatusEnum, PaymentTypeEnum } from 'types/enum';
import { renderType } from 'utils/app-config';
import { LIST_ORDER_STATUS, LIST_PAYMENT_STATUS } from '../../../utils/constants';

const AllOrderTemplate = () => {
  const { t } = useTranslation();
  const {
    getAllOrder,
    filterOrder,
    orderList,
    searchOrder,
    page,
    limit,
    setPage,
    setLimit,
    totalRows,
  } = useOrder();
  const [keyword, setKeyWord] = useState<string>(KeywordSearchEnum.CODE);
  const searchTextRef = useRef<HTMLInputElement | null>(null);
  const orderRenderType = useSelector((state: RootState) => state.order.orderRenderType);

  const [filterData, setFilterData] = useState({
    status: OrderStatusEnum.ALL,
    paymentType: PaymentTypeEnum.ALL,
    paymentStatus: PaymentStatusEnum.ALL,
  });

  useEffect(() => {
    if (orderRenderType === renderType.ALL) {
      getAllOrder(page, limit);
    } else if (orderRenderType === renderType.SEARCH) {
      handleSearchOrder();
    } else if (orderRenderType === renderType.FILTER) {
      handleFilterOrder();
    }
  }, [page, limit]);

  const handleSearchOrder = () => {
    const content = searchTextRef.current?.value;
    if ((!content || content === '') && orderList.length <= limit) {
      getAllOrder(page, limit);
      if (searchTextRef.current) {
        searchTextRef.current.value = '';
      }
      return;
    }
    if (content) {
      searchOrder(keyword.toLowerCase(), content);
    }
  };

  const handleChangeSearchKeyword = (e: SelectChangeEvent<unknown>) => {
    const value = e.target.value as string;

    if (
      value === KeywordSearchEnum.ALL &&
      keyword !== KeywordSearchEnum.ALL &&
      orderList.length < limit
    ) {
      getAllOrder(page, limit);
      setKeyWord(value);

      if (searchTextRef.current) {
        searchTextRef.current.value = '';
      }
      return;
    }
    setKeyWord(value);
  };

  const handleChangeLimitPerPage = (currentLimit: number) => {
    if (limit === currentLimit) return;
    setLimit(currentLimit);
  };

  const handleChangePage = (currentPage: number) => {
    if (page === currentPage) return;
    setPage(currentPage);
  };

  const handleChangeDropDown = (e: SelectChangeEvent<unknown>) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
  };

  const handleFilterOrder = () => {
    filterOrder(filterData);
  };

  return (
    <CustomOrder>
      <Box className='title'>
        <Typography>{t('pages/orders:title', { defaultValue: 'Order Management' })}</Typography>
      </Box>
      <Box className='searchBx flex_col w-full '>
        <Box className='w-full'>
          <Box className='w-full flex gap-4'>
            <SearchBox
              inputRef={searchTextRef}
              placeholder={t('pages/orders:searchPlaceholder', { defaultValue: 'Search for order ID, customer, order status or something ...' })}
            />
            <DropDown
              value={keyword}
              options={ORDER_SEARCH_OPTIONS}
              onChange={handleChangeSearchKeyword}
              name='delivery'
              className='grow 2xl:w-[250px]'
            />
            <Button
              variant='contained'
              className='grow btn--success px-10'
              onClick={handleSearchOrder}
            >
              {t('shared/common:search', { defaultValue: 'Search' })}
            </Button>
          </Box>
        </Box>
        <Box className='flex gap-4'>
          <DropDown
            name='status'
            value={filterData.status}
            options={LIST_ORDER_STATUS}
            onChange={handleChangeDropDown}
            className='grow w-full 2xl:w-[250px]'
          />
          <DropDown
            name='paymentType'
            value={filterData.paymentType}
            options={LIST_PAYMENT_TYPE}
            onChange={handleChangeDropDown}
            className='grow 2xl:w-[250px]'
          />
          <DropDown
            name='paymentStatus'
            value={filterData.paymentStatus}
            options={LIST_PAYMENT_STATUS}
            onChange={handleChangeDropDown}
            className='grow 2xl:w-[250px]'
          />
          <Button
            variant='contained'
            className='grow primary px-10 grow'
            onClick={handleFilterOrder}
          >
            <Icon icon='system-uicons:filtering' className='mr-2 text-white text-md' />
            <Typography className='text-[13px]'>{t('shared/common:filter', { defaultValue: 'Filters' })}</Typography>
          </Button>
        </Box>
      </Box>
      <Box className='py-5'>
        <OrderTable
          orderList={orderList}
          page={page}
          limit={limit}
          totalRows={totalRows}
          handleChangeLimitPerPage={handleChangeLimitPerPage}
          handleChangePage={handleChangePage}
        />
      </Box>
    </CustomOrder>
  );
};

export default AllOrderTemplate;
