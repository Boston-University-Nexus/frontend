import {
  CHANGE_CALENDAR,
  CLASS_STACK,
  FILTER_CLASSES,
  SAVE_CALENDARS,
  SAVE_CLASSES,
  SAVE_SECTIONS,
} from "./constants";

const initialState = {
  classes: [], // All the classes received from the backend
  calendars: [], // All the calendars received from the backend
  displayedClasses: [], // The classes currently displayed when search
  activeCalendar: {}, // The calendar displayed
  activeSections: [], // The sections displayed on the current calendar
  classStack: [], // The class stack used for navigation (class cards)
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
    case CLASS_STACK:
      return {
        ...state,
        classStack: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
