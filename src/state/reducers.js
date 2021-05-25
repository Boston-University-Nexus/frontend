import {
  CHANGE_CALENDAR,
  FILTER_CLASSES,
  SAVE_CALENDARS,
  SAVE_CLASSES,
  SAVE_SECTIONS,
} from "./constants";

const initialState = {
  classes: [],
  calendars: [],
  displayedClasses: [],
  activeCalendar: {},
  activeSections: [],
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
        activeCalendar: action.payload[0],
        activeSections: action.payload[0].sections,
      };
    case SAVE_SECTIONS:
      return {
        ...state,
        activeSections: action.payload,
      };
    case CHANGE_CALENDAR:
      return {
        ...state,
        activeCalendar: action.payload,
        activeSections: action.payload.sections,
      };
    default:
      return state;
  }
};

export default rootReducer;
