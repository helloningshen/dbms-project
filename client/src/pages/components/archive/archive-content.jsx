import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useSelector } from "react-redux"
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from "../tab-panel"
import Item from "./archive-item"


function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}




export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const { archive } = useSelector(store => store.fileList)
  const [mcs1, setMcs1] = useState([])
  const [mcs2, setMcs2] = useState([])
  const [mcs3, setMcs3] = useState([])


  useEffect(() => {

    const m1 = archive.filter(item => item.bookType == "msc1")
    const m2 = archive.filter(item => item.bookType == "msc2")
    const m3 = archive.filter(item => item.bookType == "msc3")

    setMcs1(m1)
    setMcs2(m2)
    setMcs3(m3)
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: 900 }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="SEMESTER 1" {...a11yProps(0)} />
          <Tab label="SEMESTER 2" {...a11yProps(1)} />
          <Tab label="SEMESTER 3" {...a11yProps(2)} />
          <Tab label="SEMESTER 4" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >

        <TabPanel value={value} index={0} dir={theme.direction}>
          {
            mcs1.map(i => <Item item={i} />)
          }
        </TabPanel>


        <TabPanel value={value} index={1} dir={theme.direction}>
          {
            mcs2.map(item => <Item item={item} />)

          }
        </TabPanel>

        <TabPanel value={value} index={3} dir={theme.direction}>
          {
            mcs3.map(item => <Item item={item} />)
          }
        </TabPanel>

        <TabPanel value={value} index={3} dir={theme.direction}>
          <h1>Project</h1>

        </TabPanel>

      </SwipeableViews>
    </Box>
  );
}
