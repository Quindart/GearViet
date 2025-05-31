import TextField from 'components/ui/TextField';
import React from 'react';
import { InfoGroupWrapper } from '..';
import NewProductContext from '../Context';

const GeneralInfo = () => {
  const { values, errors, touched, handleBlur, handleChange } = React.useContext(NewProductContext);

  return (
    <InfoGroupWrapper heading='TGeneral information'>
      <div className='flex justify-between flex-col items-start flex-wrap '>
        <aside className='w-full mb-2'>
          <TextField
            disabled
            label='Product Code'
            name='code'
            value={values.code.toUpperCase()}
            type='string'
            placeholder='Product code'
            id='code'
          />
        </aside>
        <aside className='w-full mb-2'>
          <TextField
            label='Brand'
            name='brand'
            value={values.brand}
            error={touched.brand && Boolean(errors.brand)}
            helperText={touched.brand && errors.brand}
            type='string'
            placeholder='Brand'
            id='brand'
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </aside>
        <aside className='w-full mb-2'>
          <TextField
            label='Quantity'
            name='available'
            value={values.available}
            error={touched.available && Boolean(errors.available)}
            helperText={touched.available && errors.available}
            type='number'
            placeholder='Tồn kho'
            id='available'
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </aside>

        <aside className='w-full mb-2 '>
          <TextField
            label='Price'
            name='price'
            type='number'
            value={values.price}
            error={touched.price && Boolean(errors.price)}
            helperText={touched.price && errors.price}
            placeholder='Price'
            id='price'
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </aside>
      </div>
    </InfoGroupWrapper>
  );
};

export default React.memo(GeneralInfo);
