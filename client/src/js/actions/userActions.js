import axios from "axios";
import {
  GET_USER,
  UPLOAD_PICTURE,
  UPDATE_USER,
} from "../constatnts/userActionTypes";
//get user
export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
        // if (res.data.errors) {
        //   dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        // } else {
        //   dispatch({ type: GET_USER_ERRORS, payload: "" });
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
          .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
          });
      })
      .catch((err) => console.log(err));
  };
};

export const updateUser = (
  userId,
  userName,
  userLastName,
  userBio,
  userEmail
) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { userName, userLastName, userBio, userEmail },
    })
      .then((res) => {
        dispatch({ type: UPDATE_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
