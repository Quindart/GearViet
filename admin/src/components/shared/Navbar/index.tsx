import { Icon } from '@iconify/react';
import { Badge, Box, IconButton, Toolbar, Typography } from '@mui/material';
import useApp from 'hooks/useApp';
import useUser from 'hooks/useUser';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavbarDropDownType } from 'types/enum';
import Message from './Message';
import Notification from './Notification';
import ProfileMenu from './ProfileMenu';
import AppbarCustom from './style';
type showDropDownStateType = {
  open: boolean;
  type: NavbarDropDownType;
};
const Navbar: React.FC = () => {
  const location = useLocation();
  const { setShowSideBar, hideSideBar } = useApp();
  const { adminDetail } = useUser();

  const [showDropDown, setShowDropDown] = useState<showDropDownStateType>({
    open: false,
    type: NavbarDropDownType.NOTHING,
  });

  const handleDropDown = (type: NavbarDropDownType) => {
    if (showDropDown.open && showDropDown.type === type) {
      setShowDropDown({
        open: false,
        type,
      });
      return;
    }
    setShowDropDown({
      open: true,
      type,
    });
  };

  useEffect(() => {
    setShowDropDown({
      open: false,
      type: NavbarDropDownType.NOTHING,
    });
  }, [location.pathname]);

  return (
    <AppbarCustom position='sticky'>
      <Toolbar className='toolbar relative p-0'>
        <Box>
          <IconButton size='large' onClick={() => setShowSideBar(!hideSideBar)}>
            {hideSideBar ? (
              <Icon icon='material-symbols:arrow-back-rounded' className='w-5 h-5 ' />
            ) : (
              <Icon icon='gg:menu-left' className='w-6 h-6 ' />
            )}
          </IconButton>
        </Box>
        <Box className='flex gap-4 h-full'>
          <Box className='icon__bx flex gap-1'>
            <Box className='relative'>
              <IconButton
                size='medium'
                onClick={() => handleDropDown(NavbarDropDownType.MESSAGE)}
                className={`nav_bar_item ${
                  showDropDown.open && showDropDown.type === NavbarDropDownType.MESSAGE
                    ? 'active'
                    : ''
                }`}
              >
                <Badge badgeContent={3}>
                  <Icon icon='ic:outline-message' />
                </Badge>
              </IconButton>
              {showDropDown.open && showDropDown.type === NavbarDropDownType.MESSAGE && <Message />}
            </Box>
            <Box className='relative'>
              <IconButton
                size='medium'
                onClick={() => handleDropDown(NavbarDropDownType.NOTIFICATION)}
                className={`nav_bar_item ${
                  showDropDown.open && showDropDown.type === NavbarDropDownType.NOTIFICATION
                    ? 'active'
                    : ''
                }`}
              >
                <Badge badgeContent={3}>
                  <Icon icon='mdi:bell-outline' />
                </Badge>
              </IconButton>
              {showDropDown.open && showDropDown.type === NavbarDropDownType.NOTIFICATION && (
                <Notification />
              )}
            </Box>
          </Box>
          <Box
            onClick={() => handleDropDown(NavbarDropDownType.PROFILE)}
            className={`avatar__bx justify-center md:bg-[#f3f3f9] md:w-[62px] md:h-full xl:w-auto xl:px-4 ${
              showDropDown.open && showDropDown.type === NavbarDropDownType.PROFILE ? 'active' : ''
            }`}
          >
            <img src={`${adminDetail?.avatar.url}`} alt={`${adminDetail?.name}`} />
            <Box className='ml-2'>
              <Typography variant='h6' className='avatar__name hidden xl:block'>
                {adminDetail?.name ? adminDetail.name : adminDetail?.username}
              </Typography>
              <Typography className='text-xs hidden xl:block '> {adminDetail?.role}</Typography>
            </Box>
          </Box>
        </Box>
        {showDropDown.open && showDropDown.type === NavbarDropDownType.PROFILE && (
          <ProfileMenu
            onItemClick={() =>
              setShowDropDown({
                open: false,
                type: NavbarDropDownType.NOTHING,
              })
            }
          />
        )}
      </Toolbar>
    </AppbarCustom>
  );
};

export default Navbar;
