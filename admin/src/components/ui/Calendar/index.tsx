import { Box, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePickerProps } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CustomCalendar from './style';

const Calendar = (props: DatePickerProps<any, any>) => {
  const { label, ...rest } = props;
  return (
    <CustomCalendar>
      {label && <Typography>{label}</Typography>}
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker inputFormat='MM/DD/YYYY' {...rest} />
        </LocalizationProvider>
      </Box>
    </CustomCalendar>
  );
};

export default Calendar;
