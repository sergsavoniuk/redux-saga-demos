import React from 'react';

import Tab from './Tabs';
import TabPanel from './Tabs/TabPanel';
import { Tabs, TabList, TabPanels } from './Tabs';
import { TabNames } from 'constants/clock/tabNames';

const { Alarms, StopWatch, Timer } = TabNames;

function ClockApp() {
  return (
    <Tabs>
      <TabList>
        <Tab name={Alarms} />
        <Tab name={StopWatch} />
        <Tab name={Timer} />
      </TabList>
      <TabPanels>
        <TabPanel componentName={Alarms} />
        <TabPanel componentName={StopWatch} />
        <TabPanel componentName={Timer} />
      </TabPanels>
    </Tabs>
  );
}

export default ClockApp;
