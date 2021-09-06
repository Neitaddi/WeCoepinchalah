import { GET_DEPARTMENTS } from "../constatnts/departmentsTypes";

const initialState = { departments: [] };

export default function departmentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DEPARTMENTS:
      return {
        departments: action.payload,
      };

    default:
      return state;
  }
}
