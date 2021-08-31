import { combineReducers } from "redux";
import userReducer from "./userReducer";
import clubsReducer from "./clubsReducer";
import clubReducer from "./clubReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  usersReducer,
  clubRed: clubReducer,
  userReducer,
  clubsRed: clubsReducer,
});
