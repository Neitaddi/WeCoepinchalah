import rootReducers from "../reducers";
import { getUsers } from "../actions/usersActions";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { getClubs } from "../actions/clubActions";
const middleware = [thunk];
const store = createStore(
  rootReducers,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
store.dispatch(getUsers());
store.dispatch(getClubs());

console.log(store);
export default store;
