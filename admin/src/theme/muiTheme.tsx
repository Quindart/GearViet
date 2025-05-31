import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import theme from 'theme';
import { SnackbarProvider } from 'notistack';
const customTheme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
  spacing: 4,
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '13px',
          '&.Mui-disabled': {
            backgroundColor: theme.disabled,
            ':hover': {
              backgroundColor: theme.disabled,
            },
          },
          ':hover': {
            backgroundColor: theme.select_item_active,
          },
          '&.Mui-selected': {
            '&.Mui-disabled': {
              backgroundColor: theme.disabled,
              ':hover': {
                backgroundColor: theme.disabled,
              },
            },
            backgroundColor: theme.select_item_active,
            ':hover': {
              backgroundColor: theme.select_item_active,
            },
            '&.Mui-focusVisible': { backgroundColor: theme.select_item_active },
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        bar: () => ({
          background: theme.primary,
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: () => ({
          boxShadow: '0 1px 2px rgb(56 65 74 / 15%)',
        }),
      },
    },
  },
  palette: {
    error: {
      main: theme.error,
      light: theme.error,
    },
  },
});

type MuiThemeProvider = {
  children: React.ReactNode;
};

const maxSnack = 5;
export const MuiThemeProvider = (props: MuiThemeProvider) => {
  return (
    <ThemeProvider theme={customTheme}>
      <SnackbarProvider
        autoHideDuration={3000}
        hideIconVariant={false}
        maxSnack={maxSnack}
        preventDuplicate={false}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {props.children}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
