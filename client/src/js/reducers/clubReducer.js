import { GET_CLUB, UPLOAD_PICTURE_CLUB } from "../constatnts/clubActionTypes";
const initialState = {};

export default function clubReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLUB:
      return action.payload;
    case UPLOAD_PICTURE_CLUB:
      return {
        ...state,
        clubPicture: action.payload,
      };
    default:
      return state;
  }
}
