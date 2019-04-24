import tabsReducer, { CHANGE_TAB, changeTab, getActiveTab } from './tabs';
import { TabNames } from 'constants/clock/tabNames';

describe('Tabs Action Creators', () => {
  it('should create an action to change a tab', () => {
    const tab = TabNames.Alarms;
    const expectedAction = {
      type: CHANGE_TAB,
      payload: {
        tab,
      },
    };

    expect(changeTab(tab)).toEqual(expectedAction);
  });
});

describe('Tabs Reducer', () => {
  it('should return the initial state', () => {
    expect(tabsReducer(undefined, {})).toEqual({ activeTab: TabNames.Alarms });
  });

  it('should handle CHANGE_TAB', () => {
    const newTab = TabNames.StopWatch;

    expect(
      tabsReducer(
        { activeTab: TabNames.Alarms },
        {
          type: CHANGE_TAB,
          payload: {
            tab: newTab,
          },
        },
      ),
    ).toEqual({ activeTab: newTab });
  });
});

describe('Tabs Selectors', () => {
  const activeTab = TabNames.Alarms;
  const mockedState = {
    clockApp: {
      tabs: {
        activeTab,
      },
    },
  };

  it('should return active tab', () => {
    expect(getActiveTab(mockedState)).toBe(activeTab);
  });
});
