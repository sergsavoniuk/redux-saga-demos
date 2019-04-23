import { TabNames } from 'constants/clock/tabNames';

// Action types
export const CHANGE_TAB = '@clock/tabs/CHANGE_TAB';

// Action creators
export function changeTab(tab) {
  return {
    type: CHANGE_TAB,
    payload: {
      tab,
    },
  };
}

export const initialState = {
  activeTab: TabNames.Alarms,
};

// Reducer
export default function tabsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TAB: {
      return {
        ...state,
        activeTab: action.payload.tab,
      };
    }
    default:
      return state;
  }
}

// Selectors
export const getActiveTab = state => state.clockApp.tabs.activeTab;
