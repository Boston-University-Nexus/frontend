import {
  CHANGE_CALENDAR,
  CLASS_STACK,
  SAVE_CALENDARS,
  SAVE_CLASSES,
  SAVE_SECTIONS,
} from "./constants";

// Saves classes to state
export const saveClasses = (payload) => {
  return { type: SAVE_CLASSES, payload };
};

// Saves classes to the state stack (class cards)
export const displayClass = (payload) => {
  return { type: CLASS_STACK, payload };
};

// Saves calendars to state
export const saveCalendars = (payload) => {
  return { type: SAVE_CALENDARS, payload };
};

// Saves sections to state
export const saveSections = (payload) => {
  return { type: SAVE_SECTIONS, payload };
};

// Changes the displayed calendar
export const changeCalendar = (payload) => {
  return { type: CHANGE_CALENDAR, payload };
};
