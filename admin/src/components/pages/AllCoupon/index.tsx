import { Box, Typography } from '@mui/material';
// import Calendar from 'components/ui/Calendar';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import useCoupon from 'hooks/useCoupon';
import { useEffect, useRef, useState } from 'react';
import SearchBox from '../../ui/SearchBox/index';
import AddModal from './AddModal/AddModal';
import TableCoupon from './TableCoupon';
import CustomCoupon from './style';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { renderType } from 'utils/app-config';
// import Calendar from 'components/ui/Calendar';
const ListALLCouponTemplate = () => {
  const [isShowAddCoupon, setIsShowAddCoupon] = useState<boolean>(false);
  const searchTextRef = useRef<HTMLInputElement | null>(null);
  const { getAllCoupon, searchCoupon, couponList, totalRows, page, setPage, limit, setLimit } =
    useCoupon();
  const couponRenderType = useSelector((state: RootState) => state.coupon.couponRenderType);

  const handleSearch = () => {
    const code = searchTextRef?.current?.value;
    if (code) {
      searchCoupon(code, page, limit);
    } else {
      getAllCoupon();
    }
  };

  const handleInputChange = () => {
    if (searchTextRef.current?.value === '') {
      getAllCoupon();
    }
  };

  const handleChangeLimitPerPage = (currentLimit: number) => {
    if (limit === currentLimit) return;
    setLimit(currentLimit);
  };

  const handleChangePage = (currentPage: number) => {
    if (page === currentPage) return;
    setPage(currentPage);
  };

  useEffect(() => {
    if (couponRenderType === renderType.ALL) {
      getAllCoupon();
    } else if (couponRenderType === renderType.SEARCH) {
      handleSearch();
    }
  }, [page, limit]);

  return (
    <>
      <CustomCoupon>
        <Box className='title xl:flex-row sm:justify-between'>
          <Typography>Coupon management</Typography>
          <Button
            onClick={() => setIsShowAddCoupon(true)}
            className='btn--success'
            variant='contained'
          >
            Add Coupon
          </Button>
        </Box>

        <Box className='flex flex-col gap-4 p-4 border-b border-dashed border-[#e9ebec] mb-4'>
          <Box className='w-full flex gap-4'>
            <SearchBox
              placeholder='Search by coupon code'
              inputRef={searchTextRef}
              onChange={handleInputChange}
            />

            <Button
              className='btn--success w-[300px] m-0 items-center'
              variant='contained'
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>

          {/* <Box className='flex gap-4 w-[100%]'>
            <Box className='grow'> <Calendar onChange={() => {}} /> </Box>
            <Box className='grow'> <Calendar onChange={() => {}} /> </Box>
            <DropDown className='grow' options={LIST_STATUS} placeholder='status' />
            <Button className='w-[300px] m-0' variant='contained'>
              <Icon icon='mdi:abacus' />
              Filters
            </Button>
          </Box> */}
        </Box>

        <Box>
          <TableCoupon
            couponList={couponList}
            page={page}
            limit={limit}
            totalRows={totalRows}
            handleChangeLimitPerPage={handleChangeLimitPerPage}
            handleChangePage={handleChangePage}
          />
        </Box>
      </CustomCoupon>
      <Modal open={isShowAddCoupon} onClose={() => setIsShowAddCoupon(false)}>
        <AddModal onClose={() => setIsShowAddCoupon(false)} />
      </Modal>
    </>
  );
};
export default ListALLCouponTemplate;
