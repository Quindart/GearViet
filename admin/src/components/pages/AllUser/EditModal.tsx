import { Icon } from '@iconify/react';
import { Box, SelectChangeEvent, Typography } from '@mui/material';
import Button from 'components/ui/Button';
import DropDown from 'components/ui/Dropdown';
import useUser from 'hooks/useUser';
import { useState } from 'react';
import { IUser } from 'types/user';
import { CustomModal } from './style';
import { LIST_ROLE, LIST_STATUS } from 'utils/constants';

type EditModalTypes = {
  onClose: () => void;
  user?: IUser;
};

type EditStateType = {
  [key: string]: string;
};
const EditModal = (props: EditModalTypes) => {
  const { onClose, user } = props;
  const [editState, setEditState] = useState<EditStateType>({
    role: user?.role || '',
    status: user?.status || '',
  });
  const { updateEditUser } = useUser();

  const handleChange = (key: string, value: string) => {
    setEditState({
      ...editState,
      [key]: value,
    });
  };
  const handleUpdateButtonClick = () => {
    updateEditUser(user?._id as string, editState);
    onClose();
  };
  const isDisabled = (): boolean => {
    return user?.role === editState.role && user?.status === editState.status;
  };
  return (
    <CustomModal>
      <Box className='header'>
        <Typography>Edit User</Typography>
        <Icon icon='ph:x-duotone' onClick={onClose} />
      </Box>

      <Box className='content__bx'>
        <DropDown
          value={editState.role}
          options={LIST_ROLE}
          label='Role'
          fullWidth
          onChange={(e: SelectChangeEvent<unknown>) =>
            handleChange('role', e.target.value as string)
          }
        />
        <DropDown
          value={editState.status}
          options={LIST_STATUS}
          label='Status'
          fullWidth
          onChange={(e: SelectChangeEvent<unknown>) =>
            handleChange('status', e.target.value as string)
          }
        />

        <Box className='btn__bx'>
          <Button variant='contained' onClick={onClose}>
            Close
          </Button>
          <Button
            disabled={isDisabled()}
            variant='contained'
            className='btn--success'
            onClick={handleUpdateButtonClick}
          >
            Update
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default EditModal;
