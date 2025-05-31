import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
import Button from 'components/ui/Button';
import TextField from 'components/ui/TextField';
import { IUser } from 'types/user';
import { CustomModal } from './style';

type DetailModalTypes = {
  onClose?: () => void;
  user?: IUser;
};

const DetailModal = (props: DetailModalTypes) => {
  const { onClose, user } = props;

  return (
    <CustomModal>
      <Box className='header'>
        <Typography>User Detail</Typography>
        <Icon icon='ph:x-duotone' onClick={onClose} />
      </Box>
      <Box className='content__bx'>
        <TextField value={user?.username} disabled label='Username' />
        <TextField value={user?.name} disabled label='Name' />
        <TextField value={user?.email} disabled label='Email' />
        <TextField value={user?.phone} disabled label='Phone' />
        <TextField value={user?.gender} disabled label='Gender' />
        <TextField value={user?.role} disabled label='Role' className='text-cap' />
        <TextField value={user?.status} disabled label='Status' className='text-cap' />
        <Box className='btn__bx'>
          <Button variant='contained' className='btn__close' onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default DetailModal;
