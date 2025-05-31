import { Icon } from '@iconify/react';
import { Box, SelectChangeEvent, Typography } from '@mui/material';
import Button from 'components/ui/Button';
import { useEffect, useState } from 'react';
import { CustomModal } from './style';
// import { IUser } from 'types/user';
import { filterUser } from 'services/userApi';
import { IUser } from 'types/user';
import { ResponseType } from 'types';
import DropDown from 'components/ui/Dropdown';
import { formatUserDropDownList } from 'utils/helper';
import { assignWarehouseUser } from 'services/orderApi';
import useOrder from 'hooks/useOrder';

type AssignModalPropsType = {
  onClose: () => void;
  orderId: string;
};

const AssignModal = (props: AssignModalPropsType) => {
  const { onClose, orderId } = props;
  const [listUser, setListUser] = useState<IUser[]>([]);
  const [editState, setEditState] = useState<string>('');
  const dropDownList = formatUserDropDownList(listUser);
  const { getAllOrder } = useOrder();

  const getListWarehouseUser = async () => {
    const res: ResponseType = await filterUser('warehouse', 'active');
    if (res.success && res.users) {
      setListUser(res.users);
    }
  };

  const onSave = async () => {
    await assignWarehouseUser(orderId, editState);
    await getAllOrder();
    onClose();
  };

  useEffect(() => {
    getListWarehouseUser();
  }, []);

  return (
    <CustomModal>
      <Box className='header'>
        <Typography>Assign User</Typography>
        <Icon icon='ph:x-duotone' onClick={onClose} />
      </Box>

      <Box className='content__bx'>
        <DropDown
          value={editState}
          options={dropDownList}
          label='Warehouse user'
          fullWidth
          onChange={(e: SelectChangeEvent<unknown>) => {
            setEditState(e.target.value as string);
          }}
        />
        <Box className='btn__bx'>
          <Button variant='contained' onClick={onClose}>
            Close
          </Button>
          <Button
            // disabled={isDisabled()}
            variant='contained'
            className='btn--success'
            onClick={onSave}
          >
            Update
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default AssignModal;
