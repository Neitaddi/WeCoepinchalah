import { GET_USERS } from "../constatnts/userActionTypes";

const initialState = {
  users: [],
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        users: action.payload,
      };
    default:
      return state;
  }
}
