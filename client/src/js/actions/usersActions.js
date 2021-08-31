import axios from "axios";

import { GET_USERS } from "../constatnts/userActionTypes";

export const getUsers = () => (dispatch) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}api/user/`)
    .then((res) => {
      dispatch({ type: GET_USERS, payload: res.data });
      console.log("res.data", res.data);
    })
    .catch((err) => console.log(err));
};
