import { Icon } from '@iconify/react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Drawer,
  Typography,
} from '@mui/material';
import useApp from 'hooks/useApp';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { APP_SIDEBAR } from 'utils/app-config';
import { drawerStyle } from './style';
import useUser from 'hooks/useUser';

const homePageIndex = 0;
const componentPageIndex = 1;

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeItemIndexes, setActiveItemIndexes] = React.useState<number[]>([]);
  const location = useLocation();
  const { adminDetail } = useUser();
  const [currentSidebarItemIndex, setCurrentSidebarItemIndex] = React.useState<number>(0);
  const { hideSideBar, setShowSideBar } = useApp();
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const getSidebarText = (section: string, defaultText: string) => {
    const translationMap: { [key: string]: string } = {
      home: 'home',
      categories: 'categoryManagement',
      Products: 'productManagement',
      all_products: 'allProduct',
      add_new: 'addProduct',
      order_management: 'orderManagement',
      all_order: 'allOrder',
      Users: 'userManagement',
      all_user: 'allUser',
      Coupons: 'couponManagement',
      all_coupons: 'allCoupon',
    };
    const key = translationMap[section] || defaultText.toLowerCase().replace(/\s+/g, '');
    return t(`shared/sidebar:${key}`, { defaultValue: defaultText });
  };

  React.useEffect(() => {
    if (location.pathname === '/') {
      setActiveItemIndexes([homePageIndex]);
      setCurrentSidebarItemIndex(homePageIndex);
      return;
    }

    if (location.pathname === '/components') {
      setActiveItemIndexes([componentPageIndex]);
      setCurrentSidebarItemIndex(componentPageIndex);
      return;
    }
    APP_SIDEBAR.forEach((item: any, itemIndex: number) => {
      if (item.children) {
        item.children.forEach((subItem: any) => {
          if (location.pathname.includes(subItem.key)) {
            setActiveItemIndexes([itemIndex]);
            setCurrentSidebarItemIndex(itemIndex);
          }
        });
      }
    });
  }, [location.pathname]);
  React.useEffect(() => {
    if (hideSideBar) {
      setActiveItemIndexes([]);
    }
  }, [hideSideBar]);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    windowWidth > 1024 ? setShowSideBar(true) : setShowSideBar(false);
    window.addEventListener('resize', handleResize);
  }, []);

  const handleToggleMenuBarItem = (indexNumber: number) => {
    if (activeItemIndexes.includes(indexNumber)) {
      setActiveItemIndexes(activeItemIndexes.filter((number: number) => number !== indexNumber));
    } else {
      setActiveItemIndexes([...activeItemIndexes, indexNumber]);
    }

    if (!hideSideBar) {
      setShowSideBar(true);
    }
  };
  return (
    <Drawer variant='permanent' sx={() => drawerStyle(hideSideBar)}>
      {hideSideBar ? (
        <Box component='section' className='w-full flex justify-center py-[26px] cursor-pointer'>
          <img
            src='https://res.cloudinary.com/dcgxrnv0k/image/upload/v1763391072/logo_yaaonz.webp'
            className='w-[200px]'
            onClick={() => {
              windowWidth <= 1024 && setShowSideBar(false);
              navigate('/');
            }}
          />
        </Box>
      ) : (
        <Box component='section' className='flex justify-center py-7 cursor-pointer'>
          <img
            src='https://res.cloudinary.com/dcgxrnv0k/image/upload/v1763391072/logo_yaaonz.webp'
            className='w-[22px] h-[22px]'
            onClick={() => {
              windowWidth <= 1024 && setShowSideBar(false);
              navigate('/');
            }}
          />
        </Box>
      )}

      {APP_SIDEBAR.map((item: any, itemIndex: number) => (
        <>
          {item.roles && adminDetail && item.roles.includes(adminDetail.role) ? (
            <Accordion
              expanded={activeItemIndexes.includes(itemIndex)}
              onChange={() => handleToggleMenuBarItem(itemIndex)}
              key={itemIndex}
              className='relative'
              title={item.text}
            >
              <AccordionSummary
                className={`${currentSidebarItemIndex === itemIndex ? 'active' : ''}`}
                expandIcon={
                  <>
                    {item.children && (
                      <Icon className='h-[18px] w-[18px]' icon='ic:outline-keyboard-arrow-down' />
                    )}
                  </>
                }
              >
                <Box
                  className='flex items-center w-full h-full  '
                  onClick={() => {
                    if (!item.children) {
                      windowWidth <= 1024 && setShowSideBar(false);
                      navigate(!item.children ? item.link : '#');
                    }
                  }}
                >
                  <Icon icon={item.icon} className='mr-2 h-[18px] w-[18px] ' />
                  <Typography className='flex-1 text-sm '>
                    {getSidebarText(item.section, item.text)}
                  </Typography>
                </Box>
              </AccordionSummary>
              {item?.children && (
                <AccordionDetails>
                  {item?.children?.map((submenuItem: any, submenuItemIndex: number) => (
                    <Typography
                      key={submenuItemIndex}
                      className={`block text-[13px] px-6 py-4 ${
                        location.pathname.includes(submenuItem.key) ? 'active' : ''
                      }`}
                      onClick={() => {
                        windowWidth <= 1024 && setShowSideBar(false);
                        navigate(submenuItem.link);
                      }}
                    >
                      {getSidebarText(submenuItem.section, submenuItem.text)}
                    </Typography>
                  ))}
                </AccordionDetails>
              )}
            </Accordion>
          ) : null}
        </>
      ))}
    </Drawer>
  );
}
