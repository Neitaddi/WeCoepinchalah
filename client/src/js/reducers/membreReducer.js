import { GET_MEMBRES } from "../constatnts/membreActionTypes";

const initialState = { membres: [] };

export default function membresReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBRES:
      return {
        membres: action.payload,
      };

    default:
      return state;
  }
}
