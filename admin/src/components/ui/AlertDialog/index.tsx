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
    <Modal open={open} onClose={onClose} {...restProps} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
      <CustomAlertDialog>
        {icon && <img src={trash_icon} alt='Delete icon' />}
        <Typography className='title' id='alert-dialog-title' component='h2'>
          Are you sure ?
        </Typography>
        <Typography className='message' id='alert-dialog-description'>
          {message}
        </Typography>
        <Box className='btn__bx'>
          <Button onClick={onClose} variant='contained' className='btn__close' aria-label='Cancel action'>
            Cancel
          </Button>
          <Button onClick={onChange} variant='contained' className='btn--danger btn__' aria-label='Confirm action'>
            OK
          </Button>
        </Box>
      </CustomAlertDialog>
    </Modal>
  );
};

export default AlertDialog;
