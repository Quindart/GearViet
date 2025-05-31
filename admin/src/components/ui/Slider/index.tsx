import { InputAdornment } from '@mui/material';
import Slider from '@mui/material/Slider';
import * as React from 'react';
import TextField from '../TextField';

function valuetext(value: number) {
  return `${value}`;
}
interface SliderPropsType {
  initialValue: Array<number | string>;
  step: number;
  min: number;
  max: number;
  onChange: (value: Array<number | string>) => void;
}

export default function CustomSlider(props: SliderPropsType) {
  const { initialValue, step, min, max, onChange } = props;
  const [value, setValue] = React.useState<Array<number | string>>(initialValue);

  const handleSliderChange = (_event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setValue([
        Math.min(newValue[0] as number, (value[1] as number) - (step as number)),
        value[1] as number,
      ]);
    } else {
      setValue([
        value[0] as number,
        Math.max(newValue[1] as number, (value[0] as number) + (step as number)),
      ]);
    }
  };
  onChange(value);

  const handleLeftInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = [
      event.target.value === '' ? '' : Number(event.target.value),
      value[1] as number,
    ];
    setValue(newValue);
  };
  const handleRightInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = [
      value[0] as number,
      event.target.value === '' ? '' : Number(event.target.value),
    ];
    setValue(newValue);
  };

  const handleBlur = () => {
    if ((value[0] as number) < (initialValue[0] as number)) {
      setValue([0, value[1] as number]);
    } else if ((value[1] as number) > (initialValue[1] as number)) {
      setValue([value[0] as number, initialValue[1] as number]);
    }
  };
  return (
    <div>
      <Slider
        className='text-[#0ab39c]'
        size='small'
        getAriaLabel={() => 'Minimum distance'}
        step={step}
        value={[
          typeof value[0] === 'number' ? value[0] : 0,
          typeof value[1] === 'number' ? value[1] : step,
        ]}
        min={min}
        max={max}
        onChange={handleSliderChange}
        valueLabelDisplay='auto'
        getAriaValueText={valuetext}
        disableSwap
      />
      {/* Left input start here */}
      <div className='slider_input-box flex items-center gap-2'>
        <TextField
          className='w-full '
          value={value[0]}
          onChange={handleLeftInputChange}
          onBlur={handleBlur}
          InputProps={{
            endAdornment: (
              <InputAdornment className='ml-0' position='end'>
                <p className='text-xs'>VND</p>
              </InputAdornment>
            ),
          }}
          inputProps={{
            className: 'text-xs pl-2 pr-0 min-w-70',
            step: step,
            min: initialValue[0],
            max: (initialValue[1] as number) - step,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
        />
        <span className='inline-block text-xs'>to</span>
        {/* Right input start here */}
        <TextField
          className='w-full min-w-70 text-xs'
          value={value[1]}
          onChange={handleRightInputChange}
          onBlur={handleBlur}
          InputProps={{
            endAdornment: (
              <InputAdornment className='ml-0' position='end'>
                <p className='text-xs'>VND</p>
              </InputAdornment>
            ),
          }}
          inputProps={{
            className: 'text-xs pl-2 pr-0 min-w-70',
            step: step,
            min: (initialValue[0] as number) + step,
            max: initialValue[1],
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
        />
      </div>
    </div>
  );
}
