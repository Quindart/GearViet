import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
import Button from 'components/ui/Button';
import { useState } from 'react';
import { Categories, Subcategory } from 'types';
import useCategory from '../../../hooks/useCategory';
import AddOrEditModal from './AddOrEditModal';
import CategoryBox from './style';
import Modal from 'components/ui/Modal';
import Accordion from 'components/ui/Accordion';
import AlertDialog from 'components/ui/AlertDialog';

export type CategoryTemplateType = {
  name: string;
  _id: string;
  subcategory: Subcategory;
};

export enum ModalCategoryLevelEnum {
  CATEGORY,
  SUB_CATEGORY,
}

export enum ModalMethodsEnum {
  EDIT,
  ADD,
  DELETE,
}

type ModalStateType = {
  open: boolean;
  level: ModalCategoryLevelEnum;
  method: ModalMethodsEnum;
  item: Categories | Subcategory | undefined;
};
const AllCategoryTemplate = () => {
  const [modal, setModal] = useState<ModalStateType>({
    open: false,
    level: ModalCategoryLevelEnum.CATEGORY,
    method: ModalMethodsEnum.ADD,
    item: undefined,
  });
  const { categories, getCategories, onDeleteCategory, onDeleteSubcategory } = useCategory();

  const handleOpenModal = (
    level: ModalCategoryLevelEnum,
    method: ModalMethodsEnum,
    item?: Categories | Subcategory,
  ) => {
    if (!item) item = undefined;
    setModal({
      open: true,
      level,
      method,
      item,
    });
  };

  const handleCloseModal = () => {
    setModal({
      ...modal,
      open: false,
    });
  };

  const handleClickToDeleteItem = () => {
    if (modal.level === ModalCategoryLevelEnum.CATEGORY && modal.item) {
      onDeleteCategory(modal.item._id);
    }

    if (modal.level === ModalCategoryLevelEnum.SUB_CATEGORY && modal.item) {
      onDeleteSubcategory(modal.item?._id);
    }
    handleCloseModal();
    getCategories();
  };

  return (
    <CategoryBox>
      <Box className='p-4'>
        <Button
          variant='contained'
          type='submit'
          className='btn--success text-md font-normal'
          onClick={() => {
            handleOpenModal(ModalCategoryLevelEnum.CATEGORY, ModalMethodsEnum.ADD);
          }}
        >
          <Icon icon='material-symbols:add' className='text-[20px] mr-1' />
          Add category
        </Button>
      </Box>
      {categories.map((category: Categories) => (
        <Accordion name={category.name} key={category._id}>
          <Box className='w-[120px] flex absolute  py-0 top-2 right-20 items-center '>
            <span
              title='Thêm subcategory'
              onClick={() =>
                handleOpenModal(ModalCategoryLevelEnum.SUB_CATEGORY, ModalMethodsEnum.ADD, category)
              }
            >
              <Icon icon='material-symbols:add' className='icon text-[#0AB39C] text-[28px]' />
            </span>
            <span title='Sửa category'>
              <Icon
                icon='material-symbols:edit'
                className='icon text-[#405189]'
                onClick={() =>
                  handleOpenModal(ModalCategoryLevelEnum.CATEGORY, ModalMethodsEnum.EDIT, category)
                }
              />
            </span>
            <span title='Xóa category'>
              <Icon
                icon='ph:trash-fill'
                className='icon text-red-500'
                onClick={() =>
                  handleOpenModal(
                    ModalCategoryLevelEnum.CATEGORY,
                    ModalMethodsEnum.DELETE,
                    category,
                  )
                }
              />
            </span>
          </Box>
          {/* Subcategory */}
          {category?.subcategory?.map((subcategory: Subcategory) => (
            <Box key={subcategory?._id}>
              <Box className='w-full flex justify-between'>
                <Typography className='text-[13px]'>{subcategory.name}</Typography>
                <Box className='flex my-2'>
                  <span title='Sửa subcategory'>
                    <Icon
                      icon='material-symbols:edit'
                      className='icon text-[#405189]'
                      onClick={() =>
                        handleOpenModal(
                          ModalCategoryLevelEnum.SUB_CATEGORY,
                          ModalMethodsEnum.EDIT,
                          subcategory,
                        )
                      }
                    />
                  </span>
                  <span title='Xóa subcategory'>
                    <Icon
                      icon='ph:trash-fill'
                      className='icon text-red-500'
                      onClick={() =>
                        handleOpenModal(
                          ModalCategoryLevelEnum.SUB_CATEGORY,
                          ModalMethodsEnum.DELETE,
                          subcategory,
                        )
                      }
                    />
                  </span>
                </Box>
              </Box>
            </Box>
          ))}
        </Accordion>
      ))}
      <Modal open={modal.open} onClose={handleCloseModal}>
        {modal.method !== ModalMethodsEnum.DELETE && (
          <AddOrEditModal
            item={modal.item}
            method={modal.method}
            level={
              modal.level === ModalCategoryLevelEnum.CATEGORY
                ? ModalCategoryLevelEnum.CATEGORY
                : ModalCategoryLevelEnum.SUB_CATEGORY
            }
            handleClose={handleCloseModal}
          />
        )}
      </Modal>
      {modal.method === ModalMethodsEnum.DELETE && (
        <AlertDialog
          open={modal.open}
          onClose={handleCloseModal}
          onChange={handleClickToDeleteItem}
          message={`Bạn có chắc muốn xóa ${
            modal.level === ModalCategoryLevelEnum.CATEGORY ? ' category ' : 'sub category'
          }  này không?`}
        />
      )}
    </CategoryBox>
  );
};

export default AllCategoryTemplate;
