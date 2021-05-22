import { FILTER_CLASSES, SAVE_CLASSES } from "./constants";

export const saveClasses = (payload) => {
  return { type: SAVE_CLASSES, payload };
};

export const filterClasses = (payload) => {
  return { type: FILTER_CLASSES, payload };
};
