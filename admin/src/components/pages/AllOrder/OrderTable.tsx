import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Modal from 'components/ui/Modal';
import Table from 'components/ui/Table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import theme from 'theme';
import { IOrder } from 'types/order';
import { formatOrderList } from 'utils/helper';
import AssignModal from './AssignModal';

type OrderTablePropsType = {
  orderList: IOrder[];
  page: number;
  limit: number;
  totalRows: number;
  handleChangeLimitPerPage: (currentPage: number) => void;
  handleChangePage: (currentLimit: number) => void;
};

type IsShowAssignModalType = {
  status: boolean;
  orderId: string;
};

const OrderTable = (props: OrderTablePropsType) => {
  const navigate = useNavigate();
  const { page, limit, handleChangeLimitPerPage, handleChangePage, totalRows, orderList } = props;

  const [isShowAssignModal, setIsShowAssignModal] = useState<IsShowAssignModalType>({
    status: false,
    orderId: '',
  });

  const handleCloseModal = () => {
    setIsShowAssignModal({ status: false, orderId: '' });
  };

  const rows = formatOrderList(orderList);

  const columns: GridColDef[] = [
    {
      field: 'code',
      sortable: false,
      minWidth: 100,
      headerName: 'Code',
    },
    {
      field: 'name',
      sortable: false,
      minWidth: 200,
      headerName: 'name',
    },
    {
      field: 'address',
      sortable: false,
      flex: 1,
      minWidth: 350,
      headerName: 'Address',
    },
    {
      field: 'phone',
      sortable: false,
      minWidth: 100,
      headerName: 'Phone',
    },
    {
      field: 'email',
      sortable: false,
      minWidth: 150,
      headerName: 'Email',
    },
    {
      field: 'dateCreated',
      sortable: false,
      minWidth: 150,
      headerName: 'Date created',
    },
    {
      field: 'quantities',
      sortable: false,
      minWidth: 60,
      headerName: 'Quantities',
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
      headerName: 'Payment Type',
    },
    {
      field: 'paymentStatus',
      sortable: false,
      minWidth: 100,
      headerName: 'Payment status',
    },
    {
      field: 'status',
      sortable: false,
      minWidth: 100,
      headerName: 'Status',
    },
    {
      field: 'action',
      headerName: 'Actions',
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
          />
          {params.row.status === 'pending' && (
            <Icon
              icon='fluent:clipboard-task-list-ltr-24-filled'
              className={`text-[${theme.primary}] cursor-pointer text-lg`}
              onClick={() =>
                setIsShowAssignModal({
                  status: true,
                  orderId: params.row._id,
                })
              }
            />
          )}
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
        <Typography className='text-center py-4'>No order here</Typography>
      )}

      <Modal open={isShowAssignModal.status} onClose={handleCloseModal}>
        <AssignModal onClose={handleCloseModal} orderId={isShowAssignModal.orderId} />
      </Modal>
    </>
  );
};

export default OrderTable;
