import {
  SAVE_COURSES,
  COURSE_STACK,
  SAVE_SCHEDULES,
  VISIBLE_SECTIONS,
  SET_SCHEDULE,
  SET_POPUPS,
  LOG_IN,
  SET_KEY,
  SAVE_USER,
} from "./constants";

// For consistency and to make these functions easily
// recognizable, all start with state
export const stateSetLoggedIn = (payload) => ({ type: LOG_IN, payload });
export const stateSaveUser = (payload) => ({ type: SAVE_USER, payload });

export const stateSaveCourses = (payload) => ({ type: SAVE_COURSES, payload });
export const stateDisplayCourse = (payload) => ({
  type: COURSE_STACK,
  payload,
});
export const stateSaveSchedules = (payload) => ({
  type: SAVE_SCHEDULES,
  payload,
});
export const stateSetVisibleSections = (payload) => ({
  type: VISIBLE_SECTIONS,
  payload,
});
export const stateSetSchedule = (payload) => ({
  type: SET_SCHEDULE,
  payload,
});
export const stateSetPopups = (payload) => ({ type: SET_POPUPS, payload });
export const stateSetExtensionKey = (payload) => ({
  type: SET_KEY,
  payload,
});
