import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from 'theme';
import LinearProgress from '@mui/material/LinearProgress';

const CustomProductDetail = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${theme.white};
  margin-top: 16px;
  margin-bottom: 16px;

  & .main__bx {
    display: flex;
    flex-direction: column;
  }
`;

export const CustomGallery = styled(Box)`
  width: 100%;
  margin-top: 16px;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  & .img__head {
    width: 100%;

    max-width: 406px;
    height: 492px;
    max-height: 492px;
    background-color: rgba(243, 246, 249);
    border-radius: 4px;
    object-fit: cover;
  }

  & .icon__bx {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;

    & .icon__item {
      width: 28px;
      height: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(64, 81, 137, 0.2);
      border-radius: 8px;
      cursor: pointer;

      & svg {
        font-size: 28px;
        color: ${theme.primary};
      }
    }
  }

  & .img__bx {
    margin-top: 16px;
    width: 100%;
    max-width: 406px;
    display: flex;
    gap: 10px;
    cursor: pointer;
    & .img__item {
      height: full;
      width: 100%;
      aspect-ratio: 1/1;
      border-radius: 4px;
      overflow: hidden;
    }

    & .active {
      background-color: rgba(243, 246, 249);
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const CustomHeader = styled(Box)`
  padding: 0 16px;
  margin-top: 48px;

  & .header__title {
    font-size: 19.5px;
    color: ${theme.text_rubric};
    font-weight: 500;
    margin-bottom: 8px;
  }

  & .header__text {
    font-size: 13px;
  }

  & .card__bx {
    margin-top: 25px;
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 24px;
    row-gap: 24px;

    & .card__item {
      height: 66px;
      display: flex;
      align-items: center;
      padding: 0 21px;
      gap: 20px;
      border: 1px dashed ${theme.border};

      & svg {
        font-size: 24px;
        color: ${theme.success};
      }
    }
  }
`;

export const CustomContent = styled(Box)`
  padding: 0 16px;
  margin-top: 48px;
  font-size: 13px;

  & .content__title {
    font-size: 14px;
    font-weight: 500;
    color: ${theme.text_rubric};
    margin-bottom: 8px;
  }

  & .content__bx {
    border: 1px solid ${theme.border};
    padding: 24px;

    & .content__item {
      display: flex;
      padding: 12px 9.6px;
      border-bottom: 1px solid ${theme.border};

      & .MuiTypography-root {
        font-size: 13px;
        color: ${theme.text_table_cell};

        &:first-child {
          font-weight: 600;
          display: block;
          width: 200px;
          max-width: 200px;
        }
      }
    }
  }
`;

export const CustomRating = styled(Box)`
  margin-top: 48px;
  padding: 0 16px;

  & .content__title {
    font-size: 14px;
    font-weight: 500;
    color: ${theme.text_rubric};
    margin-bottom: 8px;
  }

  & .rating__item {
    width: 100%;
    height: 30px;
    display: grid;
    grid-template-columns: 54px 1fr 54px;
    align-items: center;
    gap: 24px;

    & .MuiTypography-root {
      font-size: 13px;
      color: ${theme.text_rubric};
      font-weight: 500;
    }
  }

  & .rating__warning {
    & .MuiLinearProgress-bar {
      background-color: ${theme.warning} !important;
    }
  }
  & .rating__error {
    & .MuiLinearProgress-bar {
      background-color: ${theme.error} !important;
    }
  }
`;

export const CustomProgress = styled(LinearProgress)`
  border-radius: 2px;
  height: 5px;
  background-color: ${theme.bg_app};

  & .MuiLinearProgress-bar {
    background-color: ${theme.success};
    border-radius: 2px;
  }
`;

export const CustomReview = styled(Box)`
  margin-top: 48px;
  padding: 0 16px;

  & .content__title {
    font-size: 14px;
    font-weight: 500;
    color: ${theme.text_rubric};
    margin-bottom: 8px;
  }

  & .review__bx {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 225px;
    overflow: scroll;

    &::-webkit-scrollbar {
      width: 6px !important;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${theme.bg_navbar_scroll};
      border-radius: 10px;
    }

    & .review__item {
      border: 1px dashed ${theme.border};
      display: flex;
      flex-direction: column;
      gap: 18px;
      padding: 16px;
    }

    & .star__bx {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      min-width: 40px;
      height: 16px;
      border-radius: 8px;
      background-color: ${theme.success};
    }

    & .image__bx {
      display: flex;
      gap: 8px;

      & img {
        width: 48px;
        height: 48px;
        border-radius: 4px;
        object-fit: cover;
      }
    }
  }
`;

export default CustomProductDetail;
