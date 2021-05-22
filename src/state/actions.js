import { FILTER_CLASSES, SAVE_CLASSES } from "./constants";

// Saves classes to state
export const saveClasses = (payload) => {
  return { type: SAVE_CLASSES, payload };
};

// Saves filtered classes to state
export const filterClasses = (payload) => {
  return { type: FILTER_CLASSES, payload };
};
