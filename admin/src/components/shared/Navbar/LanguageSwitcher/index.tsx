import { Box, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DropDownContainer } from '../style';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <DropDownContainer>
      <Box className='notify__header'>
        <Typography className='notify__header__text'>
          {i18n.language === 'vi' ? 'Ngôn ngữ' : 'Language'}
        </Typography>
      </Box>
      <Box className='notify__body'>
        {languages.map((lang) => (
          <ListItemButton
            key={lang.code}
            component='button'
            onClick={() => handleLanguageChange(lang.code)}
            className={`notify__body__item ${i18n.language === lang.code ? 'active' : ''}`}
          >
            <ListItemIcon>
              <Box className='text-2xl'>{lang.flag}</Box>
            </ListItemIcon>
            <ListItemText
              primary={
                <Box className='ml-4'>
                  <Typography component='p' className='link'>
                    {lang.name}
                  </Typography>
                  {i18n.language === lang.code && (
                    <Typography className='text text-xs text-[#0ab39c]'>Current</Typography>
                  )}
                </Box>
              }
            />
          </ListItemButton>
        ))}
      </Box>
    </DropDownContainer>
  );
};

export default LanguageSwitcher;

