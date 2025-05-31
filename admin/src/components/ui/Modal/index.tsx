import { Box, DialogProps } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Zoom from '@mui/material/Zoom';
import React from 'react';
import CustomModal from './style';

interface ModalTypeProps extends DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

//Transition component for modal
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Zoom ref={ref} {...props} />;
});

const Modal = (props: ModalTypeProps) => {
  const { onClose, open, children, ...restProps } = props;

  return (
    <>
      <CustomModal TransitionComponent={Transition} open={open} onClose={onClose} {...restProps}>
        <Box className='modal__body'>{children}</Box>
      </CustomModal>
    </>
  );
};

export default Modal;
