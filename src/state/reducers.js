import {
  CHANGE_CALENDAR,
  CLASS_STACK,
  SET_POPUPS,
  SAVE_CALENDARS,
  SAVE_CLASSES,
  SAVE_SECTIONS,
} from "./constants";

const initialState = {
  classes: [], // All the classes received from the backend
  calendars: [], // All the calendars received from the backend
  activeCalendar: {}, // The calendar displayed
  activeSections: [], // The sections displayed on the current calendar
  classStack: [], // The class stack used for navigation (class cards)
  popups: {
    rateLimit: false,
  }, // Shows popups
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CLASSES:
      return {
        ...state,
        classes: action.payload,
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
    case SET_POPUPS:
      return {
        ...state,
        popups: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
