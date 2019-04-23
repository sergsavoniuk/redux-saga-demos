import { __DO_NOT_USE__ActionTypes } from 'redux';
import tabsReducer, { CHANGE_TAB, changeTab, initialState } from './tabs';
import { TabNames } from 'constants/clock/tabNames';

describe('TEST Action Creators', () => {
  it('test changeTab action creator', () => {
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

describe('TEST Reducer', () => {
  it('reducer return default state when unknown action is dispatched', () => {
    const action = { type: __DO_NOT_USE__ActionTypes.INIT };

    expect(tabsReducer(undefined, action)).toEqual(initialState);
  });

  it('reducer update tab property when action CHANGE_TAB is dispatched', () => {
    const tab = TabNames.StopWatch;
    const action = {
      type: CHANGE_TAB,
      payload: {
        tab,
      },
    };
    const expectedState = { activeTab: tab };

    expect(tabsReducer(initialState, action)).toEqual(expectedState);
  });
});
