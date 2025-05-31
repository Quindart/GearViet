import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from './../../../../theme/index';

const CustomProductTable = styled(Box)`
  width: 100%;
  background-color: ${theme.white};

  & .MuiDataGrid-row {
    max-height: unset !important;

    &:last-child {
      border-bottom: 1px dashed #e9ebec;
    }
  }

  & .MuiDataGrid-cell {
    min-height: 96px !important;
    max-height: 96px !important;
    border: none !important;
  }

  .MuiDataGrid-virtualScrollerRenderZone {
    position: unset !important;
    height: auto !important;
    max-height: unset !important;
  }

  .MuiDataGrid-virtualScrollerContent {
    height: unset !important;
  }

  & .totalItem {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
  }

  & .totalText {
    font-size: 13px;
    font-weight: 500;
  }
`;

export default CustomProductTable;
