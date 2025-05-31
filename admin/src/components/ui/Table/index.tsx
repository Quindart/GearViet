import { Icon } from '@iconify/react';
import { Pagination, PaginationItem, SelectChangeEvent, Typography } from '@mui/material';
import { DataGridProps } from '@mui/x-data-grid';
import theme from 'theme';
import CustomMuiTable from './style';
import Loading from '../Loading';
import DropDown from '../Dropdown';
import { LIMIT_OPTIONS } from 'utils/constants';

interface TablePropsType extends DataGridProps {
  totalPage: number;
  currentPage: number;
  hasCheckbox?: boolean;
  hasPagination?: boolean;
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (limit: number) => void;
}

interface CustomPaginationPropsType {
  currentPage: number;
  totalPage: number;
  onChangePage: (page: number) => void;
}
// Pagination
const CustomPagination = (props: CustomPaginationPropsType) => {
  const { currentPage, totalPage, onChangePage } = props;
  const previous: any = () => <Typography className='text-sm'>Previous</Typography>;
  const next: any = () => <Typography className='text-sm'>Next</Typography>;
  return (
    <>
      <Pagination
        className='ml-auto'
        sx={{
          '& .MuiPaginationItem-root': {
            backgroundColor: theme.white,
            color: theme.text_rubric,
            '&:hover': {
              backgroundColor: theme.primary,
              color: theme.white,
            },
            '&.Mui-selected': {
              backgroundColor: theme.primary,
              color: theme.white,
              '&:hover': {
                backgroundColor: theme.primary,
                color: theme.white,
              },
            },
            '&.MuiPaginationItem-ellipsis': {
              backgroundColor: theme.white,
              color: theme.text_rubric,
              '&:hover': {
                backgroundColor: theme.white,
                color: theme.text_rubric,
              },
            },
          },
        }}
        shape='rounded'
        color='primary'
        count={totalPage}
        page={currentPage}
        onChange={(_event: React.ChangeEvent<unknown>, value: number) => onChangePage(value)}
        renderItem={(item: any) => (
          <PaginationItem
            slots={{
              previous: previous,
              next: next,
            }}
            {...item}
          />
        )}
      />
    </>
  );
};
// When data not found or something wrong with server
const CustomNoRowsOverlay = () => (
  <div className='flex flex-col items-center justify-center pt-[100px]'>
    <Icon icon='material-symbols:assignment-outline-sharp' width='60' className=' text-gray-400' />

    <p>Không tìm thấy đơn hàng</p>
  </div>
);
const Table: React.FC<TablePropsType> = (props: TablePropsType) => {
  const {
    hasCheckbox,
    hasPagination,
    currentPage,
    totalPage,
    onChangePage,
    onChangeRowsPerPage,
    pageSize,
    ...rest
  } = props;
  return (
    <>
      <CustomMuiTable
        disableColumnMenu
        autoHeight
        checkboxSelection={hasCheckbox ? true : false}
        disableSelectionOnClick
        pageSize={pageSize}
        {...rest}
        loading={rest.rows.length === 0}
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
          LoadingOverlay: Loading,
        }}
        rowsPerPageOptions={[Number(pageSize)]}
      />
      {hasPagination && (
        <section className='flex m-4'>
          {pageSize && (
            <DropDown
              options={LIMIT_OPTIONS}
              value={pageSize}
              onChange={(e: SelectChangeEvent<unknown>) =>
                onChangeRowsPerPage(e.target.value as number)
              }
            />
          )}
          <CustomPagination
            currentPage={currentPage}
            totalPage={totalPage}
            onChangePage={onChangePage}
          />
        </section>
      )}
    </>
  );
};

export default Table;
