import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from 'theme';
const CustomDashBoard = styled(Box)`
  font-size: 13px;
  background-color: #f3f3f9;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 24px 0;
  display: flex;
  gap: 20px;
  line-height: 19.5px;

  & .dashboard__title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  & .dasboard__add {
    color: ${theme.success} !important;
    background-color: rgba(10, 179, 156, 0.1) !important;
    font-weight: normal;
    width: 130px;
    height: 38px;

    &:hover {
      background-color: ${theme.success} !important;
      color: ${theme.white} !important;
      box-shadow: none;
    }
  }

  & .table__header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    font-size: 16px;

    & .MuiTypography-root{
      font-size: 16px;
      color: ${theme.text_rubric}
    } 

    flex items-center justify-between p-[10px] font-[500]

  }

  & .MuiTypography-root {
    font-size: 13px;
  }



  // .MuiDataGrid-main {
  //   border: 0.3px solid #e5e7eb;
  // }

  .MuiDataGrid-row, .MuiDataGrid-cell {
    min-height: 72px !important;
    max-height: 72px !important;
  }

  .MuiDataGrid-virtualScrollerRenderZone {
    position: unset !important;
    height: auto !important;
    max-height: unset !important;
  }

  .MuiDataGrid-virtualScrollerContent {
    height: unset !important;
  }

`;
export default CustomDashBoard;

export const CustomCard = styled(Box)`
  width: 100%;
  justify-content: space-between;

  .card--root {
    border-radius: 4px;
    padding: 16px;
    height: 145px !important;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.4s;
    color: ${theme.text_gray};
    box-shadow: 0 1px 2px rgb(56 65 74 / 15%);
  }
  .card--root:hover {
    box-shadow: 0 4px 8px rgb(56 65 74 / 15%);
  }
  .box--icon {
    width: 48px;
    height: 48px;
    font-weight: 500;
    font-size: 22.75px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const CustomSimplebar = styled(Box)`
  max-width: 280px;
  height: 100vh;
  padding: 16px;
  position: fixed;
  top: 70px;
  right: 0;
  background: ${theme.white};
  overflow: scroll;
  display: none;
`;
