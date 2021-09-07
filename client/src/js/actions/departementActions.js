import axios from "axios";

import { GET_DEPARTMENTS } from "../constatnts/departmentsTypes";

export const getDepartments = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/department/`)
      .then((res) => {
        dispatch({ type: GET_DEPARTMENTS, payload: res.data });
        console.log("getDepartments", res);
      })
      .catch((err) => console.log(err));
  };
};

export const addDepartment = (
  departmentCreaterId,
  departmentClub,
  departmentBoss,
  departmentDescription,
  departmentRole
) => {
  const data = {
    departmentCreaterId,
    departmentClub,
    departmentBoss,
    departmentDescription,
    departmentRole,
  };

  return axios
    .post(
      `${process.env.REACT_APP_API_URL}api/department/${departmentClub}`,
      data
    )
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// export const updateDepartment = (
//   departmentId,
//   departmentBoss,
//   departmentDescription
// ) => {
//   return (dispatch) => {
//     return axios({
//       method: "put",
//       url: `${process.env.REACT_APP_API_URL}api/department/` + departmentId,
//       data: {
//         departmentBoss,
//         departmentDescription,
//       },
//     })
//       .then((res) => {
//         dispatch({ type: UPDATE_DEPARTMENT, payload: res.data });
//       })
//       .catch((err) => console.log(err));
//   };
// };

// //get  Department
// export const getDepartment = (did) => {
//   return (dispatch) => {
//     return axios
//       .get(`${process.env.REACT_APP_API_URL}api/department/${did}`)
//       .then((res) => {
//         dispatch({ type: GET_DEPARTMENT, payload: res.data });
//       })
//       .catch((err) => console.log(err));
//   };
// };
