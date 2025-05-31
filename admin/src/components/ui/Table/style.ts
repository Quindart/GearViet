import { DataGrid } from '@mui/x-data-grid';
import styled from '@emotion/styled';
import theme from 'theme';

const CustomMuiTable = styled(DataGrid)`
  font-size: 13px;
  width: 100%;
  overflow: auto;
  min-height: 250px;
  background-color: ${theme.white};
  border: none;
  & .MuiDataGrid-columnHeaders {
    background-color: ${theme.table_header_bg};
    border-top: 1px solid ${theme.border_input};
    border-bottom: 1px solid ${theme.border_input};
    border-left: none;
    border-right: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    font-size: 13px;
    font-weight: 600;
    min-height: 44px !important;
    max-height: 44px !important;
    text-transform: capitalize;
    color: ${theme.text_gray};
    text-align: center;

    &:hover {
      .MuiDataGrid-menuIcon {
        display: none;
      }
    }
    & .MuiDataGrid-columnHeader {
      height: 44px !important;
      &:focus-within {
        outline: none;
      }
    }
  }
  & .MuiDataGrid-virtualScroller {
    margin-top: 44px !important;
    & .MuiDataGrid-row {
      &:hover {
        background-color: ${theme.white};
      }
      &.Mui-selected {
        background-color: ${theme.white};
      }
    }
    &::-webkit-scrollbar {
      height: 4px;
      width: 4px;
    }
    &::-webkit-scrollbar-thumb:horizontal {
    }
    &::-webkit-scrollbar-thumb {
      /* width: 300px; */
      background-color: ${theme.bg_table_scroll};
      border-radius: 10px;
    }
  }

  & .MuiDataGrid-iconSeparator {
    display: none;
  }
  //Header
  & .MuiDataGrid-columnHeader,
  .MuiDataGrid-cell {
    border-right: 1px solid ${theme.table_border_right};
  }

  .MuiDataGrid-columnHeaderTitleContainerContent {
    height: 44px !important;
    & .MuiDataGrid-columnHeaderTitle {
      height: 44px !important;
      line-height: 44px;
    }
    .MuiTypography-body1 {
      font-weight: 600;
      color: ${theme.text_table_heading};
      padding-right: 20px;
    }
    .MuiButton-text {
      min-width: 0;
      padding: 0;
      color: ${theme.text_table_heading};
    }
  }

  & .MuiDataGrid-columnsContainer,
  .MuiDataGrid-cell {
    border-bottom: 1px solid ${theme.table_border_bottom};
  }

  & .MuiDataGrid-cell {
    border-left: none;
    border-right: none;
    border-bottom: 1px solid ${theme.border_input};
    color: ${theme.text_table_cell};
    align-items: center;
    font-size: 13px;
    overflow: unset;

    &:focus-within {
      outline: none;
    }
  }
  & .MuiDataGrid-cell--withRenderer {
    //Action
    & > .action_list_table {
      list-style-type: none;
      width: 100%;
      display: flex;
      justify-content: space-around;

      .MuiButton-text {
        min-width: 0;
      }

      .action_view {
        svg {
          color: ${theme.action_view};
        }
      }
      .action_edit {
        svg {
          color: ${theme.action_edit};
        }
      }
      .action_delete {
        svg {
          color: ${theme.action_delete};
        }
      }
    }

    //Rating star
    svg {
      color: ${theme.star_icon};
      display: inline-block;
    }
    //Product Card
    .MuiCard-root {
      display: flex;
      align-items: center;
      background-color: transparent;
      box-shadow: none;
      cursor: pointer;

      .MuiCardMedia-img {
        height: 40px;
        margin-right: 10px;
        padding: 2.5px;
      }

      .MuiCardContent-root {
        padding: 0;

        &:last-child {
          padding-bottom: 0;
        }
      }
    }
  }
  //Checkbox
  & {
    .MuiCheckbox-root {
      .MuiSvgIcon-root {
        color: ${theme.table_checkbox_border};
      }
    }
    .MuiCheckbox-root.Mui-checked {
      .MuiSvgIcon-root {
        color: ${theme.table_checkbox_checked};
      }
    }
  }
  & {
    .MuiDataGrid-footerContainer {
      display: none;
    }
  }
`;

export default CustomMuiTable;
