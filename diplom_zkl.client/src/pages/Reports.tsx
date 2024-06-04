import HeaderTop from '../components/HeaderTop';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Typography } from '@mui/joy';
import { useState } from 'react';
import ProjectReports from  '../components/Reports/ProjectReports';
import TaskReports from  '../components/Reports/TaskReports';
import UserReport from  '../components/Reports/UserReport';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Reports() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
    <HeaderTop Header='Отчеты' />
    <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Проекты" {...a11yProps(0)} />
        <Tab label="Задачи" {...a11yProps(1)} />
        <Tab label="Пользователи" {...a11yProps(2)} />
      </Tabs>
    </Box>
    <CustomTabPanel value={value} index={0}>
    <ProjectReports/>
    </CustomTabPanel>
    <CustomTabPanel value={value} index={1}>
      <TaskReports/>
    </CustomTabPanel>
    <CustomTabPanel value={value} index={2}>
    <UserReport />
    </CustomTabPanel>
  </Box>
  </>
  );
}

export default Reports;