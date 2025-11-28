import { Box, Typography } from '@mui/material';
import Button from 'components/ui/Button';
import TextField from 'components/ui/TextField';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalCategoryLevelEnum, ModalMethodsEnum } from '..';
import useCategory from 'hooks/useCategory';
import { Categories, Subcategory } from 'types';
// import { useState } from 'react';

type AddOrEditCategoryModalType = {
  handleClose: () => void;
  level: ModalCategoryLevelEnum;
  method: ModalMethodsEnum;
  item: Categories | Subcategory | undefined;
};

const AddOrEditModal = (props: AddOrEditCategoryModalType) => {
  const { t } = useTranslation();
  const { level, method, handleClose, item } = props;
  const [name, setName] = useState<string>('');
  const { onAddCategory, onAddSubcategory, onUpdateCategory, onUpdateSubcategory } = useCategory();

  useEffect(() => {
    if (method === ModalMethodsEnum.EDIT && item) {
      setName(item.name);
      return;
    }
  }, []);
  const handleClick = () => {
    if (method === ModalMethodsEnum.ADD) {
      if (level === ModalCategoryLevelEnum.CATEGORY) {
        onAddCategory(name);
      }

      if (level === ModalCategoryLevelEnum.SUB_CATEGORY && item) {
        onAddSubcategory(item?._id, name);
      }
    }

    if (method === ModalMethodsEnum.EDIT && item) {
      if (level === ModalCategoryLevelEnum.CATEGORY) {
        onUpdateCategory(item?._id, name);
      }
      if (level === ModalCategoryLevelEnum.SUB_CATEGORY) {
        onUpdateSubcategory(item?._id, name);
      }
    }
    handleClose();
  };
  return (
    <Box sx={{ padding: '16px' }}>
      <Typography sx={{ marginBottom: 2, fontWeight: 600 }}>
        {level === ModalCategoryLevelEnum.CATEGORY
          ? t('pages/categories:categoryName', { defaultValue: 'Category Name' })
          : t('pages/categories:subcategoryName', { defaultValue: 'Subcategory name' })}
      </Typography>
      <TextField
        className='mb-10'
        placeholder={
          level === ModalCategoryLevelEnum.CATEGORY
            ? t('pages/categories:categoryName', { defaultValue: 'Category Name' })
            : t('pages/categories:subcategoryName', { defaultValue: 'Subcategory name' })
        }
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          marginLeft: 'auto',
          marginTop: '24px',
        }}
      >
        <Button onClick={handleClose}>{t('shared/common:cancel', { defaultValue: 'Cancel' })}</Button>
        <Button variant='contained' type='submit' className='btn--success' onClick={handleClick}>
          {method === ModalMethodsEnum.ADD
            ? t('pages/categories:addNew', { defaultValue: 'Add new' })
            : t('pages/products:edit', { defaultValue: 'Edit' })}
        </Button>
      </Box>
    </Box>
  );
};

export default AddOrEditModal;
