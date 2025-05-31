import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';

interface TabPanelType {
  [key: string]: React.ReactNode;
}
interface CustomTabsPropsType {
  tabLabel?: string[];
  tabPanel: TabPanelType[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CustomTabs(props: CustomTabsPropsType) {
  const [value, setValue] = React.useState(0);

  const { tabLabel, tabPanel } = props;

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='tabs'>
          {tabLabel?.map((item: string, index: number) => (
            <Tab label={item} {...a11yProps(index)} key={item + index} />
          ))}
        </Tabs>
      </Box>
      {tabPanel.map((item: TabPanelType, index: number) => (
        <TabPanel value={value} index={index} key={value + index}>
          {item.Table}
        </TabPanel>
      ))}
    </Box>
  );
}
