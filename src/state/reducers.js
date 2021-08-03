import {
  SAVE_COURSES,
  COURSE_STACK,
  SAVE_SCHEDULES,
  VISIBLE_SECTIONS,
  SET_SCHEDULE,
  SET_POPUPS,
  LOG_IN,
} from "./constants";

// DEFAULT STATE - MANAGES THE DAT
const rootState = {
  stateCourses: [], // All the classes received from the backend
  stateSchedules: [], // All the calendars received from the backend
  stateActiveSchedule: {}, // The calendar displayed
  stateVisibleSections: [], // The sections displayed on the current calendar
  stateCourseStack: [], // The class stack used for navigation (class cards)
};

export const root = (state = rootState, a) => {
  switch (a.type) {
    case SAVE_SCHEDULES:
      return {
        ...state,
        stateSchedules: a.payload,
        stateActiveSchedule: a.payload[0],
        stateVisibleSections: a.payload[0].sections,
      };
    case SAVE_COURSES:
      return {
        ...state,
        stateCourses: a.payload,
      };
    case VISIBLE_SECTIONS:
      return {
        ...state,
        stateVisibleSections: a.payload,
      };
    case SET_SCHEDULE:
      return {
        ...state,
        stateActiveSchedule: a.payload,
        stateVisibleSections: a.payload.sections,
      };
    case COURSE_STACK:
      return {
        ...state,
        stateCourseStack: a.payload,
      };
    default:
      return state;
  }
};

// EVENTS STATE - MANAGES POPUPS, NOTIFICATIONS, ETC
const eventsState = {
  statePopups: {
    rateLimit: false,
    needLogin: false,
  }, // Shows popups
};
export const events = (state = eventsState, a) => {
  switch (a.type) {
    case SET_POPUPS:
      return {
        ...state,
        statePopups: a.payload,
      };
    default:
      return state;
  }
};

// USERS STATE - MANAGES INFO RELATED TO USERS
const usersState = {
  stateLoggedIn: false, // Manages logged in state (only for display)
};
export const users = (state = usersState, a) => {
  switch (a.type) {
    case LOG_IN:
      return {
        ...state,
        stateLoggedIn: a.payload,
      };
    default:
      return state;
  }
};
