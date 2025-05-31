import { Icon } from '@iconify/react';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import React from 'react';
import CustomAccordion from './style';

interface CustomAccordionPropsType {
  name: string;
  count?: string | number;
  children?: React.ReactNode;
}

const Accordion = (props: CustomAccordionPropsType) => {
  const { name, count, children, ...rest } = props;
  return (
    <CustomAccordion {...rest} title='Ấn để xem chi tiết'>
      <AccordionSummary expandIcon={<Icon icon='ic:round-keyboard-arrow-down' />}>
        <Typography>{name}</Typography>
        {count
          ? count > 0 && (
              <span className='inline-flex text-xs h-4 w-4 text-center justify-center rounded-full text-white ml-4'>
                {count}
              </span>
            )
          : ''}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </CustomAccordion>
  );
};

export default React.memo(Accordion);
