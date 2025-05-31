import { Box, DialogProps, Typography } from '@mui/material';
import trash_icon from '../../../assets/trash_icon.gif';
import Button from '../Button';
import Modal from '../Modal';
import CustomAlertDialog from './style';

interface AlertDialogProps extends DialogProps {
  open: boolean;
  onClose: () => void;
  onChange: () => void;
  message?: string;
  icon?: boolean;
}

const AlertDialog = (props: AlertDialogProps) => {
  const { open, onClose, onChange, message, icon, ...restProps } = props;

  return (
    <Modal open={open} onClose={onClose} {...restProps}>
      <CustomAlertDialog>
        {icon && <img src={trash_icon} />}
        <Typography className='title'>Are you sure ?</Typography>
        <Typography className='message'>{message}</Typography>
        <Box className='btn__bx'>
          <Button onClick={onClose} variant='contained' className='btn__close'>
            Cancel
          </Button>
          <Button onClick={onChange} variant='contained' className='btn--danger btn__'>
            OK
          </Button>
        </Box>
      </CustomAlertDialog>
    </Modal>
  );
};

export default AlertDialog;
