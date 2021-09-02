import { combineReducers } from "redux";
import userReducer from "./userReducer";
import clubsReducer from "./clubsReducer";
import clubReducer from "./clubReducer";
import usersReducer from "./usersReducer";
import postsReducer from "./postsReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  postes: postsReducer,
  usersReducer,
  userReducer,
  errorReducer,
  clubReducer,
  clubs: clubsReducer,
});
