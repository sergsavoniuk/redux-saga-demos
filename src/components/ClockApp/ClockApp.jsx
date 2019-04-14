import React from 'react';

import { Tabs, TabList, TabPanels } from './Tabs';
import Tab from './Tabs/Tab';
import TabPanel from './Tabs/TabPanel';
// import Stopwatch from './StopWatch';

function ClockApp() {
  return (
    <Tabs>
      <TabList>
        <Tab name="Alarm" />
        <Tab name="Stopwatch" />
        <Tab name="Timer" />
      </TabList>
      <TabPanels>
        <TabPanel name="Alarm" />
        {/* <Panel name="alarm" />
        <Panel name="stopwatch" />
        <Panel name="timer" /> */}
      </TabPanels>
    </Tabs>
  );
}

export default ClockApp;
