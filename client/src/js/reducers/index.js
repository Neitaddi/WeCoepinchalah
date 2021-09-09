import { combineReducers } from "redux";
import userReducer from "./userReducer";
import clubsReducer from "./clubsReducer";
import clubReducer from "./clubReducer";
import usersReducer from "./usersReducer";
import postsReducer from "./postsReducer";
import errorReducer from "./errorReducer";
import departmentsReducer from "./departmentsReducer";
import membresReducer from "./membreReducer";
import tacheReducer from "./tacheReducer";
export default combineReducers({
  postes: postsReducer,
  usersReducer,
  userReducer,
  errorReducer,
  clubReducer,
  clubs: clubsReducer,
  departments: departmentsReducer,
  membres: membresReducer,
  taches: tacheReducer,
});
