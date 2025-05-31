import { Box, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import AlertDialog from 'components/ui/AlertDialog';
import Table from 'components/ui/Table';
import useCoupon from 'hooks/useCoupon';
import { useState } from 'react';
import { ICoupon } from 'types/coupon';
import { formatDates } from 'utils/helper';

type TableStateType = {
  open: boolean;
  coupon: ICoupon;
};

type TableCouponPropType = {
  couponList: ICoupon[];
  page: number;
  limit: number;
  totalRows: number;
  handleChangeLimitPerPage: (currentPage: number) => void;
  handleChangePage: (currentLimit: number) => void;
  // currentUser: IUser;
};

const TableCoupon = (props: TableCouponPropType) => {
  const [tableState, setTableState] = useState<TableStateType>({
    open: false,
    coupon: {} as ICoupon,
  });
  const { couponList, page, limit, totalRows, handleChangeLimitPerPage, handleChangePage } = props;

  const { updateCouponStatus } = useCoupon();

  const handleCloseModal = () => {
    setTableState({ ...tableState, open: false });
  };
  const handleOpenModal = (coupon: ICoupon) => {
    setTableState({ ...tableState, coupon, open: true });
  };

  const columns: GridColDef[] = [
    {
      field: 'code',
      sortable: false,
      minWidth: 200,
      flex: 1,
      headerName: 'Code',
    },
    {
      field: 'discount',
      sortable: false,
      minWidth: 180,
      headerName: 'Discount',
    },
    {
      field: 'startDate',
      sortable: false,
      minWidth: 200,
      flex: 1,
      headerName: 'Start Date',
      type: 'date',
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        if (params.value === null) {
          return '';
        }

        const valueFormatted = formatDates(params.value, 'datetime');
        return valueFormatted;
      },
    },
    {
      field: 'endDate',
      sortable: false,
      minWidth: 200,
      flex: 1,
      headerName: 'End Date',
      type: 'date',
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        if (params.value === null) {
          return '';
        }

        const valueFormatted = formatDates(params.value, 'datetime');
        return valueFormatted;
      },
    },
    {
      field: 'available',
      sortable: false,
      minWidth: 50,
      headerName: 'Available',
    },
    {
      field: 'status',
      minWidth: 120,
      sortable: false,
      align: 'left',
      headerName: 'Status',
      renderCell: (params: GridRenderCellParams<string>) => (
        <Box
          className={`px-2 py-[2px] rounded-md cursor-pointer ${
            params.value === 'active' ? 'bg-[rgba(10,179,156,.1)]' : 'bg-[rgba(240,101,72,.1)]'
          }`}
          onClick={() => handleOpenModal(params.row)}
        >
          <Typography
            className={`${
              params.value === 'active' ? 'text-[#0ab39c]' : 'text-[#F06548]'
            } text-[9.75px]`}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
  ];

  return (
    <>
      {couponList.length > 0 ? (
        <Table
          onChangeRowsPerPage={handleChangeLimitPerPage}
          columns={columns}
          rows={couponList}
          currentPage={page}
          // total pages on pagination
          className='TableCoupon'
          totalPage={Math.ceil(totalRows / limit)}
          // amount of items will be showed on table
          pageSize={limit}
          onChangePage={handleChangePage}
          getRowId={(row: ICoupon) => row._id}
          hasPagination
        />
      ) : (
        <Typography className='text-center py-4'>No coupon here</Typography>
      )}

      <AlertDialog
        open={tableState.open}
        onClose={handleCloseModal}
        onChange={() => {
          updateCouponStatus(tableState.coupon._id, tableState.coupon.status);
          handleCloseModal();
        }}
        message={`Bạn có chắc muốn ${
          tableState.coupon.status === 'active' ? 'VÔ HIỆU HÓA' : 'KÍCH HOẠT'
        } mã giảm giá này không?`}
      />
    </>
  );
};

export default TableCoupon;
