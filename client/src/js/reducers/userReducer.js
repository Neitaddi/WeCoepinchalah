import {
  GET_USER,
  UPLOAD_PICTURE,
  UPDATE_USER,
} from "../constatnts/userActionTypes";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state,
        userPicture: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
}
