import { GET_MEMBRES } from "../constatnts/membreActionTypes";
import axios from "axios";

export const getMembres = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/membre/`)
      .then((res) => {
        dispatch({ type: GET_MEMBRES, payload: res.data });
        console.log("getMembres", res);
      })
      .catch((err) => console.log(err));
  };
};

export const addMembre = (
  membreCreaterId,
  membreDepartment,
  membreBoss,
  membreRole
) => {
  const data = {
    membreCreaterId,
    membreDepartment,
    membreBoss,
    membreRole,
  };

  return axios
    .post(
      `${process.env.REACT_APP_API_URL}api/Membre/${membreDepartment}`,
      data
    )
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
