import theme from 'theme';

const drawerWidth = '249px;';
const hidedDrawerWidth = '70px;';
export const drawerStyle = (isActive: boolean) => ({
  transition: 'all 0.5s ease-in-out',
  width: !isActive ? hidedDrawerWidth : drawerWidth,
  flexShrink: 0,

  ['& .MuiDrawer-paper']: {
    transition: 'all 0.5s ease-in-out',
    width: !isActive ? hidedDrawerWidth : drawerWidth,
    border: 'none',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    padding: '0 8px',
    backgroundColor: theme.bg_side_bar,
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.bg_side_bar_scroll,
      borderRadius: '10px',
    },
  },

  '& .MuiPaper-root.MuiAccordion-root': {
    color: theme.text_sidebar,
    backgroundColor: theme.bg_side_bar,
    boxShadow: 'none',
    margin: '8px 0',
    paddingLeft: '8px',
    '&::before': {
      display: 'none',
    },
    '&.Mui-expanded': {
      margin: '8px 0',
    },

    '& .MuiAccordionSummary-root': {
      minHeight: '28px',
      maxHeight: '47px',
      '& .MuiAccordionSummary-expandIconWrapper': {
        transition: 'opacity .5s ease-out, height 0.1s ease-in',
        // opacity: !isActive ? 0 : 1,
        display: !isActive ? 'none' : 'block',
        width: !isActive ? 0 : 'auto',
        overflow: 'hidden',
      },
      '&:hover': {
        '& .MuiAccordionSummary-content': {
          '& svg': {
            color: theme.white,
          },
        },
        '& svg': {
          color: theme.white,
        },
        color: theme.white,
      },
      '& .MuiAccordionSummary-content': {
        '& svg': {
          color: theme.text_sidebar,
        },
      },
      '&.Mui-expanded': {
        minHeight: '28px',
        maxHeight: '47px',
      },
      '& svg': {
        color: theme.text_sidebar,
      },

      '&.active': {
        color: theme.white,
        '& svg': {
          color: theme.white,
        },
        '&:hover': {
          color: theme.white,
        },
      },
    },
    '& .MuiAccordionDetails-root': {
      padding: '0px',
      '& .MuiTypography-root': {
        borderRadius: '8px',
        overFlow: 'hidden',
        '& .MuiTypography-root': {
          padding: '8px 24px',
        },
        cursor: 'pointer',
        '&.active': {
          color: theme.white,
          fontWeight: '600',
          '& svg': {
            color: theme.white,
          },
          '&:hover': {
            color: theme.white,
          },
        },
        '&:hover': {
          color: theme.white,
          '& svg': {
            color: theme.white,
          },
        },
      },
    },
    '& .MuiAccordionSummary-content': {
      padding: '14px 0',
      margin: '0',
      transition: 'all 0.1s ease-in',
      '& a ': {
        transition: 'justifyContent 1s ease-out',
        justifyContent: !isActive && 'center',
      },
      '& svg': {
        color: theme.white,
        transition: 'transform 0.5s ease ',
        transform: !isActive ? 'scale(1.2)' : 'scale(1)',
      },
      '& p': {
        transition: 'opacity .5s ease, height 0.1s ease-in',
        opacity: !isActive ? 0 : 1,
        width: !isActive ? 0 : '100%',
        overflow: 'hidden',
      },

      '&.Mui-expanded': {
        margin: '0',
      },
    },

    '& .MuiCollapse-root': {},
  },
});
