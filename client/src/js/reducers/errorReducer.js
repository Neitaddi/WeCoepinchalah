import {
  GET_POST_ERRORS,
  GET_USER_ERRORS,
} from "../constatnts/errorActiontype";

const initialState = { userError: [], postError: [] };

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_ERRORS:
      return {
        postError: action.payload,
        userError: [],
      };
    case GET_USER_ERRORS:
      return {
        userError: action.payload,
        postError: [],
      };
    default:
      return state;
  }
}
