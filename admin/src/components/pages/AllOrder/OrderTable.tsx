import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Table from 'components/ui/Table';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import theme from 'theme';
import { IOrder } from 'types/order';

type OrderTablePropsType = {
  orderList: IOrder[];
  page: number;
  limit: number;
  totalRows: number;
  handleChangeLimitPerPage: (currentPage: number) => void;
  handleChangePage: (currentLimit: number) => void;
};

const OrderTable = (props: OrderTablePropsType) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { page, limit, handleChangeLimitPerPage, handleChangePage, totalRows, orderList } = props;

  const rows = orderList;

  const columns: GridColDef[] = [
    {
      field: 'code',
      sortable: false,
      minWidth: 100,
      headerName: t('pages/orders:orderCode', { defaultValue: 'Code' }),
    },
    {
      field: 'name',
      sortable: false,
      minWidth: 200,
      headerName: t('pages/orders:name', { defaultValue: 'Name' }),
    },
    {
      field: 'address',
      sortable: false,
      flex: 1,
      minWidth: 350,
      headerName: t('pages/users:address', { defaultValue: 'Address' }),
    },
    {
      field: 'phone',
      sortable: false,
      minWidth: 100,
      headerName: t('pages/users:phone', { defaultValue: 'Phone' }),
    },
    {
      field: 'email',
      sortable: false,
      minWidth: 150,
      headerName: t('pages/users:email', { defaultValue: 'Email' }),
    },
    {
      field: 'dateCreated',
      sortable: false,
      minWidth: 150,
      headerName: t('pages/orders:dateCreated', { defaultValue: 'Date created' }),
    },
    {
      field: 'quantities',
      sortable: false,
      minWidth: 60,
      headerName: t('pages/orders:quantities', { defaultValue: 'Quantities' }),
      renderCell: (_: GridRenderCellParams) => (
        <Typography className='text-[13px] cursor-pointer hover:text-[#405189] transition-all'>
          {_.value}
        </Typography>
      ),
    },
    {
      field: 'paymentType',
      sortable: false,
      minWidth: 100,
      headerName: t('pages/orders:paymentType', { defaultValue: 'Payment Type' }),
    },
    {
      field: 'paymentStatus',
      sortable: false,
      minWidth: 100,
      headerName: t('pages/orders:paymentStatus', { defaultValue: 'Payment status' }),
    },
    {
      field: 'status',
      sortable: false,
      minWidth: 100,
      headerName: t('pages/orders:status', { defaultValue: 'Status' }),
    },
    {
      field: 'action',
      headerName: t('shared/common:actions', { defaultValue: 'Actions' }),
      align: 'center',
      minWidth: 60,
      renderCell: (params: GridRenderCellParams) => (
        <Box className='flex gap-4'>
          <Icon
            icon='ic:baseline-remove-red-eye'
            className={`text-[${theme.primary}] cursor-pointer text-lg`}
            onClick={() => {
              navigate(`/order/detail/${params.id}`);
            }}
            role='button'
            aria-label='View order details'
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(`/order/detail/${params.id}`);
              }
            }}
          />
        </Box>
      ),
      sortable: false,
    },
  ];

  console.log(orderList);

  return (
    <>
      {orderList.length > 0 ? (
        <Table
          columns={columns}
          rows={rows}
          currentPage={page}
          pageSize={limit}
          totalPage={Math.ceil(totalRows / limit)}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeLimitPerPage}
          // total pages on pagination
          // amount of items will be showed on table
          hasCheckbox
          hasPagination
          getRowId={(row: IOrder) => row._id}
        />
      ) : (
        <Typography className='text-center py-4'>Không có đơn hàng nào</Typography>
      )}
    </>
  );
};

export default OrderTable;
