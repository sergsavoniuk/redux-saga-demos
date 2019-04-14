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

// Reducer
export default function tabsReducer(state = { activeTab: 'Alarm' }, action) {
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
