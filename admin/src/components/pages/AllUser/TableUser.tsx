import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Modal from 'components/ui/Modal';
import Table from 'components/ui/Table';
import useUser from 'hooks/useUser';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IUser } from 'types/user';
import DetailModal from './DetailModal';
import EditModal from './EditModal';
import { Role } from 'types/enum';

enum ModalContents {
  DETAIL,
  EDIT,
}

type TableStateType = {
  open: boolean;
  content: ModalContents;
  detail: IUser;
};

type UserTablePropsType = {
  userList: IUser[];
  page: number;
  limit: number;
  totalRows: number;
  handleChangeLimitPerPage: (currentPage: number) => void;
  handleChangePage: (currentLimit: number) => void;
};

const TableUsers = (props: UserTablePropsType) => {
  const { t } = useTranslation();
  const { page, limit, handleChangeLimitPerPage, handleChangePage, totalRows, userList } = props;
  const { adminDetail } = useUser();
  const [tableState, setTableState] = useState<TableStateType>({
    open: false,
    content: ModalContents.DETAIL,
    detail: {} as IUser,
  });

  const handleCloseModal = () => {
    setTableState({ ...tableState, open: false });
  };

  const handleOpenModal = (detail: IUser, content: ModalContents) => {
    setTableState({ detail, content, open: true });
  };

  const columns: GridColDef[] = [
    {
      field: 'username',
      sortable: false,
      minWidth: 180,
      headerName: t('pages/users:username', { defaultValue: 'Username' }),
    },
    {
      field: 'name',
      sortable: false,
      minWidth: 180,
      headerName: t('pages/users:name', { defaultValue: 'Name' }),
    },
    {
      field: 'address',
      sortable: false,
      minWidth: 400,
      flex: 1,
      headerName: t('pages/users:address', { defaultValue: 'Address' }),
      renderCell: (_: GridRenderCellParams) => (
        <Typography
          className={' text-[13px] capitalize'}
        >{`${_.value?.detail} - ${_.value?.ward?.wardName} - ${_.value?.district?.districtName} - ${_.value?.province?.provinceName}`}</Typography>
      ),
    },
    {
      field: 'phone',
      sortable: false,
      minWidth: 150,
      headerName: t('pages/users:phone', { defaultValue: 'Phone' }),
    },
    {
      field: 'email',
      sortable: false,
      minWidth: 250,
      headerName: t('pages/users:email', { defaultValue: 'Email' }),
    },
    {
      field: 'gender',
      sortable: false,
      minWidth: 50,
      headerName: t('pages/users:gender', { defaultValue: 'Gender' }),
    },

    {
      field: 'role',
      sortable: false,
      minWidth: 50,
      headerName: t('pages/users:role', { defaultValue: 'Role' }),
      renderCell: (_: GridRenderCellParams) => (
        <Typography className={' text-[13px] capitalize'}>
          {_.value === null ? '' : _.value}
        </Typography>
      ),
    },
    {
      field: 'status',
      minWidth: 50,
      sortable: false,
      align: 'left',
      headerName: t('pages/users:status', { defaultValue: 'Status' }),
      renderCell: (_: GridRenderCellParams) => (
        <Box
          className={`px-2 py-[2px] rounded-md ${
            _.value === 'active' ? 'bg-[rgba(10,179,156,.1)]' : 'bg-[rgba(240,101,72,.1)]'
          }`}
        >
          <Typography
            className={`${
              _.value === 'active' ? 'text-[#0ab39c]' : 'text-[#F06548]'
            } text-[9.75px] capitalize`}
          >
            {_.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'action',
      headerName: t('shared/common:actions', { defaultValue: 'Actions' }),
      minWidth: 120,
      align: 'center',
      renderCell: (params: GridRenderCellParams<IUser>) => {
        return (
          <Box className='flex gap-4'>
            <Icon
              icon='ri:eye-fill'
              className='text-[#405189] cursor-pointer text-lg'
              onClick={() => handleOpenModal(params.row, ModalContents.DETAIL)}
              role='button'
              aria-label='View user details'
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenModal(params.row, ModalContents.DETAIL);
                }
              }}
            />
            {hasAccessibility(params.row.role) && (
              <Icon
                icon='ri:pencil-fill'
                className='text-[#405189] cursor-pointer text-lg'
                onClick={() => handleOpenModal(params.row, ModalContents.EDIT)}
                role='button'
                aria-label='Edit user'
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenModal(params.row, ModalContents.EDIT);
                  }
                }}
              />
            )}
          </Box>
        );
      },
      sortable: false,
    },
  ];

  function hasAccessibility(userRole: Role) {
    let result = false;

    if (adminDetail) {
      //If role is owner, it has all privilege
      if (adminDetail.role === Role.OWNER) {
        result = true;
      }

      //If role is admin, can change all user except admin user
      if (adminDetail.role === Role.ADMIN && userRole !== Role.ADMIN) {
        result = true;
      }

      // if (adminDetail.role === Role.ADMIN && userRole !== Role.OWNER && userRole !== Role.ADMIN) {
      //   result = true;
      // }
    }
    return result;
  }

  return (
    <>
      {userList.length > 0 ? (
        <Table
          columns={columns}
          rows={userList}
          onChangeRowsPerPage={handleChangeLimitPerPage}
          currentPage={page}
          // total pages on pagination
          className='TableUser'
          totalPage={Math.ceil(totalRows / limit)}
          // amount of items will be showed on table
          pageSize={limit}
          onChangePage={handleChangePage}
          hasPagination
          getRowId={(row: IUser) => row._id}
        />
      ) : (
        <Typography className='text-center py-4'>No user here</Typography>
      )}

      {/* TODO: gom thanh 1 state */}
      <Modal open={tableState.open} onClose={handleCloseModal}>
        {tableState.content === ModalContents.DETAIL ? (
          <DetailModal user={tableState.detail} onClose={handleCloseModal} />
        ) : (
          <EditModal user={tableState.detail} onClose={handleCloseModal} />
        )}
      </Modal>
    </>
  );
};

export default TableUsers;
