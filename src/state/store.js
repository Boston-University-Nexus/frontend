import { combineReducers, createStore } from "redux";
import { root, users, events } from "./reducers";

// Basic redux store
const combReducers = combineReducers({
  root,
  users,
  events,
});
const store = createStore(combReducers);

export default store;
