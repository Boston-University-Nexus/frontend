import { FILTER_CLASSES, SAVE_CLASSES } from "./constants";

const initialState = {
  classes: [],
  displayedClasses: [],
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
    default:
      return state;
  }
};

export default rootReducer;
