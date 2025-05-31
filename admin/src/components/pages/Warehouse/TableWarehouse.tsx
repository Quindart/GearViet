import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Table from 'components/ui/Table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IOrder } from 'types/order';
import { IUser } from 'types/user';
import Modal from './../../ui/Modal/index';
import ShippingModal from './ShippingModal';

type IsShowShippingModalType = {
  status: boolean;
  orderId: string;
};

type TableWarehousePropsTypes = {
  orderList: IOrder[];
  page: number;
  limit: number;
  totalRows: number;
  handleChangeLimitPerPage: (currentPage: number) => void;
  handleChangePage: (currentLimit: number) => void;
  currentUser: IUser;
};

const TableWarehouse = (props: TableWarehousePropsTypes) => {
  const navigate = useNavigate();
  const {
    currentUser,
    orderList,
    page,
    limit,
    totalRows,
    handleChangeLimitPerPage,
    handleChangePage,
  } = props;

  const [isShowShippingModal, setIsShowShippingModal] = useState<IsShowShippingModalType>({
    status: false,
    orderId: '',
  });

  const onClose = () => {
    setIsShowShippingModal({
      status: false,
      orderId: '',
    });
  };

  const columns: GridColDef[] = [
    {
      field: 'code',
      sortable: false,
      minWidth: 180,
      flex: 1,
      headerName: 'OrderCode',
    },
    {
      field: 'quantities',
      sortable: false,
      minWidth: 180,
      flex: 1,
      headerName: 'Products',
      renderCell: (params: GridRenderCellParams) => (
        <Typography
          className={' text-[13px] capitalize hover:text-[#405189] cursor-pointer transition-all'}
          onClick={() => {
            navigate(`/order/detail/${params.id}`);
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'warehouseUser',
      sortable: false,
      flex: 1,
      minWidth: 180,
      headerName: 'Packing  user',
      renderCell: (params: GridRenderCellParams) => {
        console.log(params);
        return params.value ? (
          <Typography className={' text-[13px] capitalize'}>{params?.value?.username}</Typography>
        ) : (
          ''
        );
      },
    },
    {
      field: 'status',
      sortable: false,
      minWidth: 180,
      flex: 1,
      headerName: 'Status',
    },

    {
      field: 'action',
      headerName: 'Actions',
      minWidth: 120,
      align: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Box className='flex gap-4'>
          <Icon
            icon='ri:eye-fill'
            className='text-[#405189] cursor-pointer text-lg'
            onClick={() => {
              navigate(`/order/detail/${params.id}`);
            }}
          />
          {currentUser && currentUser?.role !== 'admin' && (
            <Icon
              icon='ic:baseline-local-shipping'
              className='text-[#405189] cursor-pointer text-lg'
              onClick={() => setIsShowShippingModal({ status: true, orderId: params.row._id })}
            />
          )}
        </Box>
      ),
      sortable: false,
    },
  ];

  return (
    <>
      {orderList.length > 0 ? (
        <Table
          columns={columns}
          rows={orderList}
          onChangeRowsPerPage={handleChangeLimitPerPage}
          currentPage={page}
          // total pages on pagination
          className='TableUser'
          totalPage={Math.ceil(totalRows / limit)}
          // amount of items will be showed on table
          pageSize={limit}
          onChangePage={handleChangePage}
          hasPagination
        />
      ) : (
        <Typography className='text-center py-4'>No order here</Typography>
      )}

      <Modal open={isShowShippingModal.status} onClose={onClose}>
        <ShippingModal
          onClose={onClose}
          orderId={isShowShippingModal.orderId}
          currentUser={currentUser}
        />
      </Modal>
    </>
  );
};

export default TableWarehouse;
