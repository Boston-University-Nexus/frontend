import {
  CHANGE_CALENDAR,
  FILTER_CLASSES,
  SAVE_CALENDARS,
  SAVE_CLASSES,
} from "./constants";

const initialState = {
  classes: [],
  calendars: [],
  displayedClasses: [],
  activeCalendar: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CLASSES:
      return {
        ...state,
        classes: action.payload,
      };
    case FILTER_CLASSES:
      return {
        ...state,
        displayedClasses: action.payload,
      };
    case SAVE_CALENDARS:
      return {
        ...state,
        calendars: action.payload,
      };
    case CHANGE_CALENDAR:
      return {
        ...state,
        activeCalendar: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
