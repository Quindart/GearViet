import { Icon } from '@iconify/react';
import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { APP_PROFILE_MENU } from 'utils/app-config';
import { ProfileBox } from '../style';
import { useDispatch } from 'react-redux';
import { toggleProfileModal } from 'store/slices/appSlice';
import useUser from 'hooks/useUser';

type ProfileMenuTypes = {
  onItemClick: () => void;
};

const ProfileMenu = (props: ProfileMenuTypes) => {
  const { onItemClick } = props;
  const { adminDetail, handleLogout } = useUser();
  const dispatch = useDispatch();
  return (
    <ProfileBox>
      <Typography variant='h6' className='profile__title'>
        Welcome {adminDetail?.name}
      </Typography>
      <ListItemButton
        component='a'
        className='profile__item'
        onClick={() => {
          onItemClick();
          dispatch(toggleProfileModal());
        }}
      >
        <ListItemIcon>
          <Icon icon='mdi:account-circle' />
        </ListItemIcon>
        <ListItemText primary='Profile' />
      </ListItemButton>
      {APP_PROFILE_MENU.map((item: any, index: number) => (
        <ListItemButton
          component='a'
          href='#simple-list'
          key={index}
          className='profile__item'
          onClick={() => {
            onItemClick();
          }}
        >
          <ListItemIcon>
            <Icon icon={item.icon} />
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
      <ListItemButton
        component='a'
        href='#simple-list'
        className='profile__item'
        onClick={handleLogout}
      >
        <ListItemIcon>
          <Icon icon='mdi:logout' />
        </ListItemIcon>
        <ListItemText primary='Logout' />
      </ListItemButton>
    </ProfileBox>
  );
};

export default ProfileMenu;
