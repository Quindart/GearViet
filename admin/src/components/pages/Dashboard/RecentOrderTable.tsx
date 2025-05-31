import { Box, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Table from 'components/ui/Table';
import { useState } from 'react';
import { IOrder } from 'types/order';
import { formatOrderList } from 'utils/helper';
import Moment from 'moment';

type RecentOrderTablePropsType = {
  orders: IOrder[];
};

const RecentOrderTable = (props: RecentOrderTablePropsType) => {
  const { orders } = props;
  console.log(orders);

  const rows = orders ? formatOrderList(orders) : [];
  const [currentPage, setCurrentPage] = useState(1);
  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };
  const columns: GridColDef[] = [
    {
      field: 'code',
      sortable: false,
      minWidth: 140,
      headerName: 'Order Id',
      renderCell: (params: GridRenderCellParams) => (
        <Typography className='p-[6px] uppercase'>#{params.value}</Typography>
      ),
    },
    {
      field: 'name',
      sortable: false,
      flex: 1,
      minWidth: 200,
      headerName: 'Customer',
      renderCell: (params: GridRenderCellParams) => (
        <Box className='flex gap-2'>
          <Typography className='p-[6px]'>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'address',
      sortable: false,
      minWidth: 350,
      headerName: 'Address',
    },
    {
      field: 'phone',
      sortable: false,
      minWidth: 150,
      headerName: 'Phone',
    },
    {
      field: 'quantities',
      sortable: false,
      minWidth: 100,
      headerName: 'Product',
    },
    {
      field: 'dateCreated',
      sortable: false,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Typography className='p-[6px] uppercase'>
          {Moment(params.value).format('HH:mm:ss YYYY-MM-DD')}
        </Typography>
      ),
    },
  ];

  return (
    <>
      <Table
        onChangeRowsPerPage={() => {}}
        columns={columns}
        rows={rows}
        currentPage={currentPage}
        className='RecentOrderTable'
        totalPage={4}
        // hasPagination
        // amount of items will be showed on table
        pageSize={5}
        onChangePage={onChangePage}
      />
    </>
  );
};

export default RecentOrderTable;
