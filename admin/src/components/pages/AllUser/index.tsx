import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Button from 'components/ui/Button';
import DropDown from 'components/ui/Dropdown';
import SearchBox from 'components/ui/SearchBox';
import useUser from 'hooks/useUser';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { KeywordSearchEnum, Role, UserStatus } from 'types/enum';
import { renderType } from 'utils/app-config';
import { LIST_ROLE, LIST_STATUS, USER_SEARCH_OPTIONS } from 'utils/constants';
import TableUsers from './TableUser';
import CustomUser from './style';

const ListAllUserTemplate = () => {
  const { t } = useTranslation();
  const {
    getAllUser,
    userList,
    searchUser,
    page,
    limit,
    setPage,
    setLimit,
    totalRows,
    filterUser,
  } = useUser();
  const searchTextRef = useRef<HTMLInputElement | null>(null);
  const [keyword, setKeyWord] = useState<string>(KeywordSearchEnum.USERNAME);
  const [filterRole, setFilterRole] = useState<string>(Role.ALL);
  const [filterStatus, setFilterStatus] = useState<string>(UserStatus.ALL);
  const userRenderType = useSelector((state: RootState) => state.user.userRenderType);

  useEffect(() => {
    if (userRenderType === renderType.ALL) {
      getAllUser(page, limit);
    } else if (userRenderType === renderType.SEARCH) {
      handleSearchUser();
    } else if (userRenderType === renderType.FILTER) {
      handleFilter();
    }
  }, [page, limit]);

  const handleChangeLimitPerPage = (currentLimit: number) => {
    if (limit === currentLimit) return;
    setLimit(currentLimit);
  };

  const handleChangePage = (currentPage: number) => {
    if (page === currentPage) return;
    setPage(currentPage);
  };

  const handleSearchUser = () => {
    const content = searchTextRef.current?.value;
    setFilterRole(Role.ALL);
    setFilterStatus(UserStatus.ALL);
    if ((!content || content === '') && userList.length <= limit) {
      getAllUser(page, limit);
      if (searchTextRef.current) {
        searchTextRef.current.value = '';
      }
      return;
    }
    if (content) {
      searchUser(keyword.toLowerCase(), content, page, limit);
    }
  };

  const handleChangeSearchKeyword = (e: SelectChangeEvent<unknown>) => {
    const value = e.target.value as string;

    if (
      value === KeywordSearchEnum.ALL &&
      keyword !== KeywordSearchEnum.ALL &&
      userList.length < limit
    ) {
      getAllUser(page, limit);
      setKeyWord(value);

      if (searchTextRef.current) {
        searchTextRef.current.value = '';
      }
      return;
    }
    setKeyWord(value);
  };

  const handleChangeRole = (e: SelectChangeEvent<unknown>) => {
    const value = e.target.value as string;
    if (value) {
      setFilterRole(value);
    }
  };

  const handleChangeStatus = (e: SelectChangeEvent<unknown>) => {
    const value = e.target.value as string;
    if (value) {
      setFilterStatus(value);
    }
  };

  const handleFilter = () => {
    filterUser(filterRole, filterStatus, page, limit);
  };

  return (
    <>
      <CustomUser>
        <Box className='title'>
          <Typography>{t('pages/users:title', { defaultValue: 'User Management' })}</Typography>
        </Box>

        <Box className='flex flex-col gap-4 p-4 border-b border-dashed border-[#e9ebec] mb-4'>
          <Box className='w-full flex gap-4'>
            <SearchBox
              inputRef={searchTextRef}
              placeholder={t('pages/users:searchPlaceholder', { defaultValue: 'Search for username, name, email ...' })}
            />
            <DropDown
              className='grow'
              options={USER_SEARCH_OPTIONS}
              value={keyword}
              onChange={handleChangeSearchKeyword}
            />
            <Button
              className='btn--success w-[300px] m-0'
              variant='contained'
              onClick={handleSearchUser}
            >
              {t('shared/common:search', { defaultValue: 'Search' })}
            </Button>
          </Box>

          <Box className='flex gap-4 w-[100%]'>
            <DropDown
              className='grow'
              options={LIST_ROLE}
              value={filterRole}
              onChange={handleChangeRole}
            />
            <DropDown
              className='grow'
              options={LIST_STATUS}
              value={filterStatus}
              onChange={handleChangeStatus}
            />
            <Button className='grow w-[300px] m-0' variant='contained' onClick={handleFilter}>
              <Icon icon='mdi:abacus' />
              {t('shared/common:filter', { defaultValue: 'Filters' })}
            </Button>
          </Box>
        </Box>
        <Box>
          <TableUsers
            userList={userList}
            page={page}
            limit={limit}
            totalRows={totalRows}
            handleChangeLimitPerPage={handleChangeLimitPerPage}
            handleChangePage={handleChangePage}
          />
        </Box>
      </CustomUser>
    </>
  );
};
export default ListAllUserTemplate;
