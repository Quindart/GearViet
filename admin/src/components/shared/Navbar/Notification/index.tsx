import { Box, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import avatar from '../../../../assets/images/avatar.jpg';
import { Icon } from '@iconify/react';
import Button from 'components/ui/Button';
import { DropDownContainer } from '../style';

const Notification: React.FC = () => {
  return (
    <DropDownContainer>
      <Box className='notify__header'>
        <Typography className='notify__header__text'>Notifications</Typography>
      </Box>
      <Box className='notify__body'>
        <ListItemButton component='a' href='#simple-list' className='notify__body__item'>
          <ListItemIcon>
            <Box className=''>
              <img src={avatar} alt='avatar' className='rounded-full w-8 h-8' />
            </Box>
          </ListItemIcon>
          <ListItemText
            primary={
              <Box className='ml-4'>
                <Typography component='p' className='link'>
                  Angela Bernier
                </Typography>
                <Typography className='link text'>
                  Answered to your comment on the cash flow forecast's graph 🔔.
                </Typography>
                <Typography className='time'>48 min ago</Typography>
              </Box>
            }
          />
        </ListItemButton>
        <ListItemButton component='a' href='#simple-list' className='notify__body__item'>
          <ListItemIcon>
            <Box className=''>
              <img
                src='https://themesbrand.com/velzon/html/default/assets/images/users/avatar-3.jpg'
                alt='avatar'
                className='rounded-full w-8 h-8'
              />
            </Box>
          </ListItemIcon>
          <ListItemText
            primary={
              <Box className='ml-4'>
                <Typography component='p' className='link'>
                  Angela Bernier
                </Typography>
                <Typography className='link text'>
                  Answered to your comment on the cash flow forecast's graph 🔔.
                </Typography>
                <Typography className='time'>48 min ago</Typography>
              </Box>
            }
          />
        </ListItemButton>

        <Box className='text-center py-4'>
          <Button variant='contained' className='btn--success'>
            View all notification
            <Icon icon='ri:arrow-right-line' className='text-[13px]' />
          </Button>
        </Box>
      </Box>
    </DropDownContainer>
  );
};

export default Notification;
