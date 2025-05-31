import { Box, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Table from 'components/ui/Table';
import { useState } from 'react';
import { ProductDataType } from 'types/product';
import { formatProductList } from 'utils/helper';

type NewestTablePropsType = {
  products: ProductDataType[];
};

const NewProductTable = (props: NewestTablePropsType) => {
  const { products } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const rows = products ? formatProductList(products) : [];

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };
  const columns: GridColDef[] = [
    {
      field: 'product',
      sortable: false,
      minWidth: 250,
      flex: 1,
      headerName: 'Product',
      renderCell: (params: GridRenderCellParams) => (
        <Box className='flex gap-2'>
          <img
            className='w-[40px] h-[40px] bg-[rgba(243,246,249)] rounded-sm'
            src={params.value.url}
          />
          <Box>
            <Typography className='text-[14px] text-[#495057] font-medium'>
              {params.value.name}
            </Typography>
            <Typography className='text-[13px] text-[#878A99]'>
              Category: {params.value.subcategory}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'code',
      sortable: false,
      minWidth: 80,
      headerName: 'Code',
    },
    {
      field: 'price',
      sortable: false,
      minWidth: 80,
      headerName: 'Price',
    },
    {
      field: 'available',
      sortable: false,
      minWidth: 80,
      headerName: 'Stock',
    },
    {
      field: 'brand',
      sortable: false,
      minWidth: 80,
      headerName: 'Brand',
    },
  ];

  return (
    <>
      <Table
        onChangeRowsPerPage={() => {}}
        columns={columns}
        rows={rows}
        currentPage={currentPage}
        // total pages on pagination
        className='NewProductTable'
        totalPage={4}
        // hasPagination
        // amount of items will be showed on table
        pageSize={5}
        onChangePage={onChangePage}
      />
    </>
  );
};

export default NewProductTable;
