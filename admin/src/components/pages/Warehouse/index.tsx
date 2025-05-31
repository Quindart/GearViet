import { Box, Typography } from '@mui/material';
import Button from 'components/ui/Button';
import SearchBox from 'components/ui/SearchBox';
import useOrder from 'hooks/useOrder';
import useUser from 'hooks/useUser';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { renderType } from 'utils/app-config';
import { IUser } from './../../../types/user';
import TableWarehouse from './TableWarehouse';
import CustomWarehouse from './style';

const WarehouseTemplate = () => {
  const { getAdminDetail, adminDetail } = useUser();
  const {
    searchAssignedOrder,
    getAllAssignedOrder,
    orderList,
    totalRows,
    page,
    setPage,
    limit,
    setLimit,
  } = useOrder();
  const searchTextRef = useRef<HTMLInputElement | null>(null);
  const orderRenderType = useSelector((state: RootState) => state.order.orderRenderType);

  const handleSearch = async () => {
    const searchText = searchTextRef?.current?.value;
    await searchAssignedOrder(adminDetail as IUser, searchText as string, page, limit);
  };

  const getAssignedOrder = async () => {
    await getAllAssignedOrder(adminDetail as IUser);
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
    if (orderRenderType === renderType.ALL) {
      getAssignedOrder();
    } else if (orderRenderType === renderType.SEARCH) {
      handleSearch();
    }
  }, [page, limit]);

  useEffect(() => {
    getAdminDetail();
  }, []);

  return (
    <>
      <CustomWarehouse>
        <Box className='title'>
          <Typography>Warehouse Management</Typography>
        </Box>

        <Box className='flex flex-col gap-4 p-4 border-b border-dashed border-[#e9ebec] mb-4'>
          <Box className='w-full flex gap-4'>
            <SearchBox inputRef={searchTextRef} placeholder='Search by order ID' />
            <Button
              className='btn--success w-[300px] m-0'
              variant='contained'
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
        </Box>
        <Box>
          <TableWarehouse
            orderList={orderList}
            page={page}
            limit={limit}
            totalRows={totalRows}
            handleChangeLimitPerPage={handleChangeLimitPerPage}
            handleChangePage={handleChangePage}
            currentUser={adminDetail as IUser}
          />
        </Box>
      </CustomWarehouse>
    </>
  );
};

export default WarehouseTemplate;
