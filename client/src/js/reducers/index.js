import { combineReducers } from "redux";
import userReducer from "./userReducer";
import clubsReducer from "./clubsReducer";
import clubReducer from "./clubReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  usersRed: usersReducer,
  clubRed: clubReducer,
  userReducer,
  clubsRed: clubsReducer,
});
