import { GET_CLUBS } from "../constatnts/clubActionTypes";

const initialState = {
  clubs: [],
};

export default function clubsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLUBS:
      return {
        clubs: action.payload,
      };

    default:
      return state;
  }
}
