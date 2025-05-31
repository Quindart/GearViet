import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from 'theme';
// import theme from 'theme';

const CustomProduct = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;

  & .filterBx {
    width: 100%;
    height: max-content;
    background-color: white;
  }

  & .tableBx {
    flex-grow: 1;
    background-color: white;
    height: max-content;
  }

  & .MuiDataGrid-virtualScroller {
    &::-webkit-scrollbar {
      height: 8px !important;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${theme.bg_navbar_scroll};
      border-radius: 10px;
    }
  }

  & .MuiDataGrid-virtualScrollerContent {
    height: unset !important;
    width: max-content !important;
    transform: none !important;

    & .MuiDataGrid-virtualScrollerRenderZone {
      position: unset;
    }

    & .MuiDataGrid-row,
    & .MuiDataGrid-cell {
      min-height: 74px !important;
    }
  }
`;

export const CustomModal = styled(Box)`
  width: 100%;

  & .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: rgba(243, 246, 249);

    & .MuiTypography-root {
      font-size: 16.25px;
      font-weight: 600;
      color: ${theme.text_rubric};
    }

    & svg {
      font-size: 20px;
      cursor: pointer;
      transition: all 0.5s ease-in-out;
    }

    & svg:hover {
      color: ${theme.primary};
    }
  }

  & .content__bx {
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    & .content__empty {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
  }

  & .content__item {
    width: 100%;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px dashed ${theme.border};

    & .review__content__bx {
      display: flex;
      gap: 16px;

      & img {
        width: 48px;
        height: 48px;
        border-radius: 4px;
        background-color: rgba(243, 246, 249);
      }

      & .MuiTypography-root {
        font-size: 13px;
        color: ${theme.text_gray};
        margin-bottom: 1px;
      }
    }

    & .review__author__bx {
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      & .MuiTypography-root {
        font-size: 13px;
        color: ${theme.text_gray};
        margin-bottom: 1px;
      }
    }
  }

  & .comment__content__bx {
    gap: 20px;
  }

  & .comment__item {
    border: none;
    padding: 0;
    flex-direction: row;
    margin-bottom: 8px;
    align-items: flex-start;
    & img {
      width: 48px;
      height: 48px;
      border-radius: 4px;
      background-color: rgba(243, 246, 249);
    }

    & .comment__content {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-left: 8px;
      & .MuiTypography-root {
        font-size: 12px;
        color: ${theme.text_gray};
        margin-bottom: 1px;
      }

      &__title {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      & .comment__text {
        color: ${theme.text_rubric};
        text-align: justify;
      }

      & .reply__bx {
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
        transition: all 0.5s ease-in-out;

        &:hover {
          & svg,
          & .MuiTypography-root {
            color: ${theme.primary};
          }
        }

        & svg {
          color: ${theme.text_gray};
        }
      }

      & .reply__content__bx {
        width: 100%;
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 8px;

        & .reply__container-container {
          width: 100%;
          display: flex;
          & .reply__info {
            margin-left: 8px;
            flex: 1;
            & .reply__date {
              text-align: right;
            }
          }
        }
        & .MuiInputBase-root {
          height: 40px;
          font-size: 11px;
        }

        & .MuiButtonBase-root {
          font-size: 12px;
          font-weight: 400;
          margin-left: 8px;
        }

        & .btn--save {
          background-color: ${theme.button_success_contained_bg};
        }
      }
    }
  }
`;

export default CustomProduct;
