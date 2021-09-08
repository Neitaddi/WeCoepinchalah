import {
  GET_DEPARTMENTS,
  UPDATE_DEPARTMENT,
  DELETE_DEPARTMENT,
} from "../constatnts/departmentsTypes";

const initialState = { departments: [] };

export default function departmentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DEPARTMENTS:
      return {
        departments: action.payload,
      };
    case UPDATE_DEPARTMENT:
      return state.departments.map((department) => {
        if (department._id === action.payload.departmentId) {
          return {
            ...department,
            departmentBoss: action.payload.departmentBoss,
            departmentDescription: action.payload.departmentDescription,
            departmentRole: action.payload.departmentRole,
          };
        } else return department;
      });
    case DELETE_DEPARTMENT:
      return state.departments.filter(
        (department) => department._id !== action.payload.departmentId
      );

    default:
      return state;
  }
}
