import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InfoGroupWrapper } from '..';
import { SelectChangeEvent, Typography } from '@mui/material';
import DropDown from 'components/ui/Dropdown';
import useApp from 'hooks/useApp';
import NewProductContext from '../Context';
import { Categories, Subcategory } from 'types';
import { useLocation } from 'react-router-dom';
type CategoryPropsType = {
  setOpenModal: (openModal: boolean) => void;
};
const Category = (props: CategoryPropsType) => {
  const { t } = useTranslation();
  const { categories } = useApp();
  const location = useLocation();
  const { values, handleChange, setFieldValue } = React.useContext(NewProductContext);
  const [subcategories, setSubcategories] = useState<Subcategory[] | undefined>([]);
  const pickOutSubcategory = (pickedCategoryId: string) => {
    const pickedCategory: Categories | undefined = categories.find(
      (category: Categories) => category._id === pickedCategoryId,
    );
    setSubcategories(pickedCategory ? pickedCategory?.subcategory : []);
  };
  const findSubcategory = (e: SelectChangeEvent<unknown>) => {
    const pickedCategoryId = e.target.value as string;
    if (pickedCategoryId !== values.category) {
      handleChange(e);
      setFieldValue('subcategory', '');
    }
    pickOutSubcategory(pickedCategoryId);
  };

  React.useEffect(() => {
    if (values.category && location.state) {
      pickOutSubcategory(values.category);
    }
  }, [values.category, location.state]);

  return (
    <InfoGroupWrapper heading={t('pages/products:productCategory', { defaultValue: 'Product Category' })}>
      {/* TODO: Add new category by open a new modal {[key:string]:object} */}
      <div className='flex justify-between items-center mb-2'>
        <Typography className='flex-1 text-xs text-zinc-400'>{t('pages/products:selectCategory', { defaultValue: 'Select category' })}</Typography>
        <a
          type='button'
          className='inline-block text-sm underline hover:text-blue-600 text-blue-400 cursor-pointer'
          onClick={() => props.setOpenModal(true)}
        >
          {t('pages/products:createNew', { defaultValue: 'Create new' })}
        </a>
      </div>
      <DropDown
        name='category'
        className='w-full'
        value={values.category}
        placeholder={t('pages/products:selectCategory', { defaultValue: 'Select category' })}
        options={categories}
        onChange={findSubcategory}
      />

      {values.category && (
        <DropDown
          name='subcategory'
          value={values.subcategory}
          className='w-full mt-4'
          placeholder={t('pages/products:selectSubcategory', { defaultValue: 'Select subcategory' })}
          options={subcategories}
          onChange={handleChange}
        />
      )}
    </InfoGroupWrapper>
  );
};

export default React.memo(Category);
